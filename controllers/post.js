// const { default: mongoose } = require("mongoose");
const Post = require("../models/postModel");


exports.createPost = async (req,res) => {
    try {
        // extract title and description from req body
        const {title,body} = req.body;

        //create a new blog obj & insert in DB
        const response = await Post.create({title,body});

        //send a json res with a success flag
        res.status(200).json(
            {
                success:true,
                data:response,
                message:'Entry created successfully'
            }
        );

    } catch (error) {
        console.error(error)
        console.log(error)
        res.status(500).json(
            {
                success:false,
                data:"Error while creating post",
                message:error.message,
            }
        )
    }
}

exports.retrievePost = async (req,res) => {
    try {
        const posts = await Post.find({}).populate("comments").populate("likes");

        //response
        res.status(200).json(
            {
                posts,
            }
        )
    } catch (error) {
        console.log(error)
        return res.status(500).json(
            {
                success:false,
                data:"Error while fethcing.",
            }
        )
    }
}