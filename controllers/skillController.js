const Skill = require('../models/Skill');

const validateSkill = (data) => {
  const errors = [];

  if (!data.name || typeof data.name !== 'string' || !data.name.trim()) {
    errors.push('name is required and must be a non-empty string');
  }

  if (!data.level || !['Beginner', 'Intermediate', 'Advanced'].includes(data.level)) {
    errors.push('level is required and must be one of Beginner, Intermediate, Advanced');
  }

  if (!data.category || typeof data.category !== 'string' || !data.category.trim()) {
    errors.push('category is required and must be a non-empty string');
  }

  if (data.yearsOfExperience !== undefined && typeof data.yearsOfExperience !== 'number') {
    errors.push('yearsOfExperience must be a number');
  }

  if (data.isHighlighted !== undefined && typeof data.isHighlighted !== 'boolean') {
    errors.push('isHighlighted must be a boolean');
  }

  return errors;
};

exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    return res.status(200).json(skills);
  } catch (err) {
    console.error('Error fetching skills:', err);
    return res.status(500).json({ message: 'Error fetching skills', error: err.message });
  }
};

exports.getSkillById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || id.length !== 24) {
      return res.status(400).json({ message: 'Invalid skill ID format' });
    }

    const skill = await Skill.findById(id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    return res.status(200).json(skill);
  } catch (err) {
    console.error('Error fetching skill:', err);
    return res.status(500).json({ message: 'Error fetching skill', error: err.message });
  }
};

exports.createSkill = async (req, res) => {
  try {
    const errors = validateSkill(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    const skill = new Skill(req.body);
    const savedSkill = await skill.save();
    return res.status(201).json(savedSkill);
  } catch (err) {
    console.error('Error creating skill:', err);
    return res.status(500).json({ message: 'Error creating skill', error: err.message });
  }
};

exports.updateSkill = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || id.length !== 24) {
      return res.status(400).json({ message: 'Invalid skill ID format' });
    }

    const errors = validateSkill(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    const updatedSkill = await Skill.findByIdAndUpdate(id, req.body, {
      new: true
    });

    if (!updatedSkill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    return res.status(200).json(updatedSkill);
  } catch (err) {
    console.error('Error updating skill:', err);
    return res.status(500).json({ message: 'Error updating skill', error: err.message });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || id.length !== 24) {
      return res.status(400).json({ message: 'Invalid skill ID format' });
    }

    const deletedSkill = await Skill.findByIdAndDelete(id);
    if (!deletedSkill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    return res.status(200).json({ message: 'Skill deleted successfully' });
  } catch (err) {
    console.error('Error deleting skill:', err);
    return res.status(500).json({ message: 'Error deleting skill', error: err.message });
  }
};
