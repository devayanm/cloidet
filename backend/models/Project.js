const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, default: '' },
  language: { type: String, required: true },
});

const ProjectSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  description: { type: String },
  files: [FileSchema], 
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', ProjectSchema);
