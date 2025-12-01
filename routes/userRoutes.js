// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateObjectId = require('../middleware/validateObjectId');

router.get('/', userController.getUsers);
router.get('/:id', validateObjectId, userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', validateObjectId, userController.updateUser);
router.delete('/:id', validateObjectId, userController.deleteUser);

module.exports = router;
