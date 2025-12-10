const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
    category: { type: String, required: true }, // e.g. "Frontend", "Backend", "Database"
    icon: { type: String },
    yearsOfExperience: { type: Number, default: 0 },
    isHighlighted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', skillSchema);
