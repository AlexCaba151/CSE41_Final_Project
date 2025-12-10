const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { isAuthenticated } = require('../middleware/auth');

// Public GETs
router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProjectById);

// Protected POST/PUT/DELETE
router.post('/', isAuthenticated, projectController.createProject);
router.put('/:id', isAuthenticated, projectController.updateProject);
router.delete('/:id', isAuthenticated, projectController.deleteProject);

module.exports = router;
