const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({})
    // .then(posts => {
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts: posts
    //     });
    // })
    // .catch(err => {
    //   console.log(err);
    // });

    // fetch all the  posts of each user
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate:{
            path: 'user',
        }
    })
    .exec()
    .then(posts => {
        
        User.find({})
        .then((users) => {
            return res.render('home', {
                title: "Codeial | Home",
                posts: posts,
                all_users: users
            });
        })
        .catch((err) => {
            console.log('error', err);
        });
    


    })
    .catch(err => {
        console.log('error', err);
    });
}

// module.exports.actionName = function(req, res){}