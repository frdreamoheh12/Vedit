const mongoose = require('mongoose');

const classApplicationSchema = new mongoose.Schema({
  applicationId: { type: String, required: true, unique: true, index: true },
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  discordUsername: { type: String, required: true },
  country: { type: String, required: true },
  timeZone: { type: String, required: true },
  phoneNumber: { type: String },
  course: { type: String, enum: ['Video Editing', 'Photo Editing', 'Both'], required: true },
  skillLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
  motivation: { type: String, required: true },
  hasDevice: { type: String, enum: ['Yes', 'No'], required: true },
  hasEditedBefore: { type: String, enum: ['Yes', 'No'], required: true },
  portfolioLink: { type: String },
  agreesToRules: { type: Boolean, required: true },
  status: { type: String, enum: ['Pending', 'Under Review', 'Accepted', 'Rejected', 'Completed'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('ClassApplication', classApplicationSchema);
