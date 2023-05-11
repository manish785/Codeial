const express = require('express');

const router = express.Router();
const passport = require('passport');
const postApi = require("../../../controllers/api/v1/posts_api");


router.get('/', postApi.index);
router.delete('/:id',passport.authenticate('jwt', {session:false}), postApi.destroy); // {session:false} -> prevents
// from the session cookie to be generated

module.exports = router;