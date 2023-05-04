const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id,
    })
    .then(post => {
        return res.redirect('back');
    })
    .catch(err => {
        console.log('error in creating post', err);
    });
}

module.exports.destroy = function(req, res){
    Post.findById(req.params.id).lean().exec()
    .then(post => {
      //.id automatically conveets the object id into the string 
      if (post.user == req.user.id) {
        const postInstance = new Post(post);
        postInstance.deleteOne();
  
        return Comment.deleteMany({ post: req.params.id }).exec();
      } else {
        return res.redirect('back');
      }
    })
    .then(() => {
      return res.redirect('back');
    })
    .catch(err => {
      console.error(err);
      return res.redirect('back');
    });
}