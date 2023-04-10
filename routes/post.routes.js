const express = require('express');
const routes = express.Router();
const auth = require("../middleware/auth");
const { createPost, postUsingId, updatePost, deletePost } = require('../controllers/post.controller');
const postModel = require('../models/post.model');

//  create a new post
routes.post("/",async (req, res) => {
    const {userId}=req.body;
    const data={
        image:req.body.image,
        content:req.body.content
    }
    
    const post = await createPost(userId, data);

    if (post.status) {
        res.status(404).json(post);
    }
    else {
        res.status(201).json({ post: post });
    }
})

// get post by id
routes.get('/:id', async (req, res) => {
    const postId = req.params.id;
    const post = await postUsingId(postId);
    console.log(post);
    if (post.status) {
        res.status(404).json(post);
    }
    else {
        res.status(200).json({ post: post });
    }
});

//  update post by id
routes.put('/:id', async (req, res) => {
    const postId = req.params.id;
    const data = req.body;
    const post = await updatePost(postId, data);
    if (post.status) {
        res.status(404).json(post);
    }
    else {
        res.status(200).json({ post: post });
    }
})

// delete post by id
routes.delete('/:id', async (req, res) => {
    const postId = req.params.id;
    const post = await deletePost(postId);
    if (post.status) {
        res.status(404).json(post);
    }
    else {
        res.status(200).json({ post: post });
    }
})

//  like a post
routes.post("/:id/like", async (req, res) => {
    try {
        const id = req.params.id;
        const {userId} = req.body;
        console.log(userId);

        const post = await postModel.findById(id);
        console.log(id)

        // Check if the user has already rated the movie
        const existinglikeIndex = post.likes.findIndex((likeObj) => likeObj.userId.equals(userId));
        if (existinglikeIndex !== -1) {
          return res.status(400).json({ message: "You have already liked this post." });
        }

        // Add the userId to the likes array
        post.likes.push({ userId: userId });

        // Update the post document in the database
        await postModel.findByIdAndUpdate(id, { likes: post.likes });


        // Fetch the updated post with like
        const updatedPost = await postModel.findById(id);


        return res.status(201).json(updatedPost);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

// unlike a post
routes.post("/:id/unlike",async (req, res) => {
    try {
        const id = req.params.id;
        const {userId} = req.body;

        const post = await postModel.findById(id);
        console.log(id)

        // Check if the user has already rated the movie
        const existingLikeIndex = post.likes.findIndex((likeObj) => likeObj.userId.equals(userId));
        if (existingLikeIndex === -1) {
            return res
                .status(400)
                .json({ message: "You have not liked this post." });
            }

        // Add the userId to the likes array
        post.likes.splice(existingLikeIndex, 1);

        // Update the post document in the database
        await postModel.findByIdAndUpdate(id, { likes: post.likes });


        // Fetch the updated post with like
        const updatedPost = await postModel.findById(id);


        return res.status(201).json(updatedPost);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})


// get a user all posts
routes.get("/profilePost/:id", async(req,res)=>{
    try {
        const userId = req.params.id;
        const posts = await postModel.find({ user_id: userId });
        if (posts.length === 0) {
        res.status(404).json({ message: "No posts found for this user." });
        } else {
        res.status(200).json(posts);
        }
    } catch (error) {
        res.status(404).json({message: error.message});
    }
  
})







module.exports = routes;