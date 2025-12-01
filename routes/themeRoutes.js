// routes/themeRoutes.js
const express = require('express');
const router = express.Router();
const themeController = require('../controllers/themeController');
const validateObjectId = require('../middleware/validateObjectId');

router.get('/', themeController.getThemes);
router.get('/:id', validateObjectId, themeController.getThemeById);
router.post('/', themeController.createTheme);
router.put('/:id', validateObjectId, themeController.updateTheme);
router.delete('/:id', validateObjectId, themeController.deleteTheme);

module.exports = router;
