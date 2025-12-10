const Project = require('../models/Project');

const validateProject = (data) => {
  const errors = [];

  if (!data.title || typeof data.title !== 'string' || !data.title.trim()) {
    errors.push('title is required and must be a non-empty string');
  }

  if (!data.description || typeof data.description !== 'string' || !data.description.trim()) {
    errors.push('description is required and must be a non-empty string');
  }

  if (data.techStack && !Array.isArray(data.techStack)) {
    errors.push('techStack must be an array of strings');
  }

  if (data.isFeatured !== undefined && typeof data.isFeatured !== 'boolean') {
    errors.push('isFeatured must be a boolean');
  }

  return errors;
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    return res.status(200).json(projects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    return res.status(500).json({ message: 'Error fetching projects', error: err.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || id.length !== 24) {
      return res.status(400).json({ message: 'Invalid project ID format' });
    }

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.status(200).json(project);
  } catch (err) {
    console.error('Error fetching project:', err);
    return res.status(500).json({ message: 'Error fetching project', error: err.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const errors = validateProject(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    const project = new Project(req.body);
    const savedProject = await project.save();
    return res.status(201).json(savedProject);
  } catch (err) {
    console.error('Error creating project:', err);
    return res.status(500).json({ message: 'Error creating project', error: err.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || id.length !== 24) {
      return res.status(400).json({ message: 'Invalid project ID format' });
    }

    const errors = validateProject(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
      new: true
    });

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.status(200).json(updatedProject);
  } catch (err) {
    console.error('Error updating project:', err);
    return res.status(500).json({ message: 'Error updating project', error: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || id.length !== 24) {
      return res.status(400).json({ message: 'Invalid project ID format' });
    }

    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error('Error deleting project:', err);
    return res.status(500).json({ message: 'Error deleting project', error: err.message });
  }
};
