const User = require('../models/user');

module.exports.profile = function(req, res){
  User.findById(req.params.id)
  .then(user => {
    res.render('user_profile', {
      title: 'User Profile',
      profile_user: user
    });
  })
  .catch(err => {
    // handle the error
  });

}

module.exports.update = async function(req, res){
  /* if(req.user.id == req.params.id){
       User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
           req.flash('success', 'Updated!');
           return res.redirect('back');
       });
   }else{
       req.flash('error', 'Unauthorized!');
       return res.status(401).send('Unauthorized');
   }*/
   if(req.user.id == req.params.id){
       try{
            let user=await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('******Multer Error:',err);
                }
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file){
                   
                  //  if(user.avatar){
                  //      fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                  //  }
                   
                   
                   user.avatar=User.avatarPath+'/'+req.file.filename;

                }
                user.save();
                return res.redirect('back');
            })
       }catch(err){
           req.flash('error',err);
           return res.redirect('back');
       }
   }else{
       req.flash('error', 'Unauthorized!');
       return res.status(401).send('Unauthorized'); 
   }

}



//render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
      return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title: 'Codeial | Sign Up'
    })
}

// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
      return res.redirect('/users/profile');
    }

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
    req.flash('success', 'Logged in successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
  req.logout(function(err){
    if(err){
      console.log('Error in logging out', err);
      return;
    }
    req.flash('success', 'You have Logged Out successfully');
    return res.redirect('/');
  });
 
};

