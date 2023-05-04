const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.create = async function(req, res){
    // try{
    // }catch(err){
        
    // }
    // Post.findById(req.body.post)
    //   .then(post => {
    //       if(post){
    //           return Comment.create({
    //               content: req.body.content,
    //               post: req.body.post,
    //               user: req.user._id,
    //           });
    //       } else {
    //           throw new Error('Post not found');
    //       }
    //   })
    //   .then(comment => {
    //      // console.log(comment)
    //       post.comment.push(comment);
    //      // console.log(post)
    //       return post.save();
    //   })
    //   .then(() => {
    //       res.redirect('/');
    //   })
    //   .catch(err => {
    //       console.log('error', err);
    //   });
    try {
      const post = await Post.findById(req.body.post);
    
      if (post) {
        const comment = await Comment.create({
          content: req.body.content,
          post: req.body.post,
          user: req.user._id,
        });
    
        post.comments.push(comment);
        await post.save();
    
        // if (req.xhr) {
        //   // Similar for comments to fetch the user's id!
        //   await comment.populate("user", "name");
    
        //   return res.status(200).json({
        //     data: {
        //       comment: comment,
        //     },
        //     message: "Post created!",
        //   });
        // }
    
        // req.flash("success", "Comment published!");
    
        res.redirect("/");
      }
    } catch (err) {
      // req.flash("error", err);
      // Handle the error as appropriate
      console.log('error', err);
    }    
}

module.exports.destroy = function(req, res) {
  Comment.findById(req.params.id)
  .then(comment => {
    if(comment.user == req.user.id) {
      let postId = comment.post;
      comment.deleteOne()
        .then(() => {
          return Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}})
        })
        .then(() => {
          return res.redirect('back');
        })
        .catch(err => {
          console.error(err);
          return res.redirect('back');
        })
    } else {
      return res.redirect('back');
    }
  })
  .catch(err => {
    console.error(err);
    return res.redirect('back');
  })

}
