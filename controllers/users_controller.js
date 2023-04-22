const User = require('../models/user');

module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}

//render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up',{
        title: 'Codeial | Sign Up'
    })
}

// render the sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in',{
        title: 'Codeial | Sign In'
    })
}

//get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
       return res.redirect('back')
    }
    User.findOne({email: req.body.email})
    .then(user => {
      if (!user) {
        return User.create(req.body);
      } else {
        return Promise.reject('User already exists');
      }
    })
    .then(user => {
      return res.redirect('/users/sign-in');
    })
    .catch(err => {
      console.log(err);
      return res.redirect('back');
    });
}

//get the sign in data
module.exports.createSession = function(req, res){
    //ToDo: later
}





