import mongoose from 'mongoose';
const timestamps = require('mongoose-timestamp');

const Schema = mongoose.Schema;

const snippetSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  text: { type: String },
  topics: [{ type: String }],
});

snippetSchema.plugin(timestamps);

export default mongoose.model('Snippet', snippetSchema);
