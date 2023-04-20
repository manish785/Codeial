const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');

// In the users Controller, we are accessing the profile method
router.get('/profile',  usersController.profile);


module.exports = router;