const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

exports.createComments = async (req,res) => {
    try {
        //fetch data from req body
        const {post, user, body} = req.body;
        //create a comment object
        const comment = new Comment({
            post, user, body
        })
        //save the new comment into the db
        const saveComment = await comment.save();
        // const response = await Comment.create({post, user,body});

        //find the post by id, add the new comment to its comments array
        const updatedPost = await Post.findByIdAndUpdate(
            post, {$push: {comments: saveComment._id}}, {new:true}
        ).populate("comments");   //provide actual comments

        res.json(
            {
                post: updatedPost,
                success: true,
            }
        )
    } catch (error) {
        console.error(error)
        console.log(error)
        res.status(500).json(
            {
                success:false,
                data:"Server error",
                message:error.message,
            }
        )
    }
}


// exports.retrieveComments = async (req,res) => {
//     try {
        
//     } catch (error) {
//         console.error(error)
//         console.log(error)
//         res.status(500).json(
//             {
//                 success:false,
//                 data:"Server error",
//                 message:error.message,
//             }
//         )
//     }
// }