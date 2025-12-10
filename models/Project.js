const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    liveUrl: { type: String },
    githubUrl: { type: String },
    techStack: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    thumbnailUrl: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
