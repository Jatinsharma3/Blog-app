const Post = require("../models/postModel");
const Like = require("../models/likeModel");

exports.likeBlog = async (req, res) => {
    try {
        const { post, user } = req.body;
        const response = await Like.create({post,user});

        const updatePost = await Post.findByIdAndUpdate(post, {$push: {likes: response._id}}, {new: true}).populate("likes");
        res.status(200).json(
            {
                success: true,
                // data: response,
                post:updatePost,
                // message: "Likes update successfully",
            }
        )
    } catch (error) {
        console.error(error)
        console.log(error)
        res.status(500).json(
            {
                success: false,
                data: "Server error",
                message: error.message,
            }
        )
    }
}


exports.unlikeBlog = async (req, res) => {
    try {
        const { post, like } = req.body;
        if (!post || !like) {
            return res.status(400).json({
                success: false,
                message: "Post ID and Like ID are required",
            });
        }

        //find and delete the like in the collection 
        const deletedLike = await Like.findOneAndDelete({post:post, _id:like})

        //update the post collection
        const updatePost = await Post.findByIdAndUpdate(post,{$pull: {likes: deletedLike._id}}, {new:true})
        res.status(200).json(
            {
                success: true,
                post:updatePost,
                // data: deleteLike,
                message: "Likes deleted successfully",
            }
        )
    } catch (error) {
        console.error(error)
        console.log(error)
        res.status(500).json(
            {
                success: false,
                data: "Error while unliking post",
                message: error.message,
            }
        )
    }
}