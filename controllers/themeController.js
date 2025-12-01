// controllers/themeController.js
const Theme = require('../models/Theme');

const validateTheme = (data) => {
  const errors = [];

  if (!data.name || typeof data.name !== 'string' || !data.name.trim()) {
    errors.push('name is required and must be a non-empty string');
  }
  if (!data.primaryColor || typeof data.primaryColor !== 'string') {
    errors.push('primaryColor is required and must be a string');
  }
  if (!data.secondaryColor || typeof data.secondaryColor !== 'string') {
    errors.push('secondaryColor is required and must be a string');
  }
  if (!data.fontFamily || typeof data.fontFamily !== 'string') {
    errors.push('fontFamily is required and must be a string');
  }
  if (data.isDark !== undefined && typeof data.isDark !== 'boolean') {
    errors.push('isDark must be a boolean');
  }

  return errors;
};

exports.getThemes = async (req, res) => {
  try {
    const themes = await Theme.find();
    res.status(200).json(themes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching themes', error: error.message });
  }
};

exports.getThemeById = async (req, res) => {
  try {
    const theme = await Theme.findById(req.params.id);
    if (!theme) {
      return res.status(404).json({ message: 'Theme not found' });
    }
    res.status(200).json(theme);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching theme', error: error.message });
  }
};

exports.createTheme = async (req, res) => {
  try {
    const errors = validateTheme(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    const theme = new Theme(req.body);
    const saved = await theme.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Theme name must be unique' });
    }
    res.status(500).json({ message: 'Error creating theme', error: error.message });
  }
};

exports.updateTheme = async (req, res) => {
  try {
    const errors = validateTheme(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    const updated = await Theme.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!updated) {
      return res.status(404).json({ message: 'Theme not found' });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating theme', error: error.message });
  }
};

exports.deleteTheme = async (req, res) => {
  try {
    const deleted = await Theme.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Theme not found' });
    }
    res.status(200).json({ message: 'Theme deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting theme', error: error.message });
  }
};
