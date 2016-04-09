import mongoose from 'mongoose';
const timestamps = require('mongoose-timestamp');

const Schema = mongoose.Schema;

const topicSchema = new Schema({
  tag: { type: String, unique: true },
  type: { type: String },
});

topicSchema.plugin(timestamps);

export default mongoose.model('Topic', topicSchema);
