const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');

// In the users Controller, we are accessing the profile method
router.get('/profile',  usersController.profile);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);

module.exports = router;