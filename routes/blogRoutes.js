
const express = require('express')
const router = express.Router();

//import controllers
const {createPost, retrievePost} = require("../controllers/post")
const {likeBlog, unlikeBlog} = require("../controllers/like")
const {createComments, retrieveComments} = require("../controllers/comment")

//define api routes
// router.get("/dummy", (req,res)=>{
//     res.send(`<h1>This your dummy routes</h1>`);
//     console.log("Dummy route")
// })

router.post("/posts/create", createPost);
router.get("/posts", retrievePost);

router.post("/likes/like", likeBlog);
router.post("/likes/unlike", unlikeBlog);

router.post("/comments/create", createComments);
// router.get("/comments", retrieveComments);

//export
module.exports = router;