const mongoose = require('mongoose');

const teamApplicationSchema = new mongoose.Schema({
  applicationId: { type: String, required: true, unique: true, index: true },
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  discordUsername: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, required: true },
  experience: { type: String, required: true },
  portfolio: { type: String, required: true },
  specialization: { type: String, enum: ['Video Editor', 'Photo Editor', 'Thumbnail Designer', 'Motion Designer'], required: true },
  availability: { type: String, required: true },
  whyHireYou: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Under Review', 'Accepted', 'Rejected', 'Completed'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('TeamApplication', teamApplicationSchema);
