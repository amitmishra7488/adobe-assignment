const { createUser, loginUser, userProfile, updateUser, deleteUser } = require('../controllers/user.controller')
const express = require('express')
const routes = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config()



// create user
routes.post('/', async (req, res) => {

    const user = req.body;
    
    const newUser = await createUser(user);
    
    console.log(newUser);
    try {
        if (newUser.status) {
            res.status(400).json(newUser);
        }
        else {
            res.status(201).json({ user: newUser, message: 'User created successfully' });
        }
    }
    catch (error) {
        res.status(504).json(error.message);
    }
})

// login route
routes.post('/login', async (req, res) => {
    const user = req.body;
    const newUser = await loginUser(user);
    console.log(newUser);

    if (newUser.status) {
        res.status(404).json(newUser);
    }
    else {
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        res.status(200).send({ user: newUser, token: token, message: 'User Logged In successfully' });
    }
})


// get user by id
routes.get('/:id', async(req, res) => {
    const userId = req.params.id;
    const profile = await userProfile(userId);
    console.log(profile);
    if (profile.status) {
        res.status(404).json(profile);
    }
    else{
        res.status(200).json(profile);
    }
});

// update user by id
routes.put('/:id', async (req, res) => {
    const userId = req.params.id;
    const data={};
    const {bio,name} = req.body;
    if(bio){
        data.bio = bio;
    }
    if(name){
        data.name = name;
    }
    
    
    const user= await updateUser(userId,data);
    if (user.status) {
        res.status(404).json(user);
    }
    else{
        res.status(200).json({user:user});
    }
})

// delete user by id
routes.delete('/:id', async(req, res)=>{
    const userId = req.params.id;
    const user= await deleteUser(userId);
    if (user.status) {
        res.status(404).json(user);
    }
    else{
        res.status(200).json({user:user});
    }
})



module.exports = routes;