const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');
const { isAuthenticated } = require('../middleware/auth');

// Public GETs
router.get('/', skillController.getSkills);
router.get('/:id', skillController.getSkillById);

// Protected POST/PUT/DELETE
router.post('/', isAuthenticated, skillController.createSkill);
router.put('/:id', isAuthenticated, skillController.updateSkill);
router.delete('/:id', isAuthenticated, skillController.deleteSkill);

module.exports = router;
