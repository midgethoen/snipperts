import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';
import Topic from './topic';
import User from './user';
import Promise from 'bluebird';
import { tail } from 'ramda';

const Schema = mongoose.Schema;

const snippetSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  text: { type: String },
  topics: [{ type: String, ref: 'Topic' }],
  mentions: [{ type: String, ref: 'User' }],
});

const referenceRegex = /([#@])([\w-_]+)/g;

snippetSchema.pre('save', function preSave(next) {
  if (this.isNew) {
    let match;
    const tokens = [];
    while ( match = referenceRegex.exec(this.text) ){ // eslint-disable-line
      const [token, mention] = tail(match);
      tokens.push({ mention, token });
    }

    const tasks = tokens.map(({ mention, token }) => {
      if (token === '@') {
        return User.findOne({ username: mention })
          .then(user   => {
            if (user) {
              this.users.push(user._id);
            }
          });
      }
      return Topic.findOne({ tag: mention })
        .then(topic => {
          if (!topic) {
            return new Topic({ tag: mention }).save();
          }
          return topic;
        })
        .then(topic => {
          this.topics.push(topic._id);
        });
    });
    Promise.all(tasks).then(next);
  }
});

snippetSchema.plugin(timestamps);

export default mongoose.model('Snippet', snippetSchema);
