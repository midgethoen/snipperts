import mongoose from 'mongoose';
const timestamps = require('mongoose-timestamp');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true },
  fullName: { type: String },
  email: { type: String },  // TODO: use some email validator
  pictureUrl: { type: String },
  google: { type: Object },
});

userSchema.plugin(timestamps);

export default mongoose.model('User', userSchema);
