const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true, minlength: 1,maxlength:50, trim:true },
    email: { type: String, required: true, unique: true, trim:true },
    bio:{type: String, default:"Add Bio" , maxlength: 200},
    password: { type: String, required: true, minlength: 6 },
    dp:{type: String, default:'https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png'},
    
}, { timestamps: true })



const userModel = mongoose.model('User', userSchema);
module.exports = userModel;