const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
    image: { type: String, required: true },
    content: { type: String, required: true,minlength: 1, maxlength:300},
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    likes: [{ 
        userId: { type: Schema.Types.ObjectId, ref: "User" },
    }],
    
},
    { timestamps: true,}
)

const postModel = mongoose.model('Post', postSchema);
module.exports = postModel;