const express = require('express');

const router = express.Router();

//accessing the home controller
const homeController = require('../controllers/home_controller'); 
console.log('router loaded');

//this request will go and the access the home function in the home controller
router.get('/', homeController.home);

module.exports = router;