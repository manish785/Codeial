const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req, res){

    let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate:{
                path: 'user',
            }
        });

    return res.json(200, {
       'message': 'List of posts',
       posts: posts
    })
}



module.exports.destroy = async function(req, res){
    try{
      let post = await Post.findById(req.params.id);
    
      //.id automatically conveets the object id into the string 
      if (post.user == req.user.id) {
        const postInstance = new Post(post);
        postInstance.deleteOne();
  
        await Comment.deleteMany({ post: req.params.id });

       // req.flash('success', 'Post and associated comments deleted!');

        //return res.redirect('back');
        return res.json(200, {
            'message': 'Post and associated comments deleted',
        })
      } else {
        return res.json(401, {
            'message': 'You can not delete this post.',
        });
      } 
    }catch(err){
        //req.flash('error', err);
       // return res.redirect('back');
       return res.json(500, {
           'message': 'Internal Server Error',
       });
    }
}