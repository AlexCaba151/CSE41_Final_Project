// models/Theme.js
const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    primaryColor: {
      type: String,
      required: true,
      trim: true
    },
    secondaryColor: {
      type: String,
      required: true,
      trim: true
    },
    fontFamily: {
      type: String,
      required: true,
      trim: true
    },
    isDark: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Theme', themeSchema);
