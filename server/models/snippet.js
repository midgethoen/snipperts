import mongoose from 'mongoose';
const timestamps = require('mongoose-timestamp');

const Schema = mongoose.Schema;

const snippetSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  text: { type: String },
  topics: [{ type: String, ref: 'Topic' }],
  mentions: [{ type: String, ref: 'User' }],
});

const referenceRegex = /([#@])[\w-_]+/g;
const tokenMap = { '@': 'mentions', '#': 'topics' };

snippetSchema.pre('save', function preSave(next) {
  if (this.isNew) {
    let match;
    while ( match = referenceRegex.exec(this.text) ){ // eslint-disable-line
      const [mention, token] = match;
      this[tokenMap[token]] = mention;
    }
  }
  next();
});

snippetSchema.plugin(timestamps);

export default mongoose.model('Snippet', snippetSchema);
