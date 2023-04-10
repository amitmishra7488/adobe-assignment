const express = require('express');
const userModel = require('../models/user.model');
const { getAllUser } = require('../controllers/user.controller');
const { getAllPost, topLikedPosts } = require('../controllers/post.controller');
const routes = express.Router();
require('dotenv').config()


routes.get('/users', async (req, res) => {
    const users = await getAllUser();

    if (users.status) {
        res.status(404).json(users);
    }
    else {
        res.status(200).json(users);
    }
});


routes.get('/posts', async (req, res) => {
    const posts = await getAllPost();

    if (posts.status) {
        res.status(404).json(posts);
    }
    else {
        res.status(200).json(posts);
    }
});


routes.get('/posts/top-liked', async (req, res) => {

    const posts = await topLikedPosts();
    if (posts.status) {
        res.status(404).json(posts);
    }
    else {
        res.status(200).json(posts);
    }

})







module.exports = routes;