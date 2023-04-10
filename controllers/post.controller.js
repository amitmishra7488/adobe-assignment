const postModel = require('../models/post.model')


const createPost = async (userId,data)=>{

    try {
        const newPost = await postModel.create({ ...data, user_id:userId });
        const populatedPost = await postModel.findById(newPost._id).populate('user_id', 'dp name').exec();
        return populatedPost;
      } catch (err) {
        return {
            status: 'failed',
            message: err.message
        }
      }
}

const postUsingId = async (postId) => {

    try {
        const post = await postModel.findById(postId);
        console.log(post);
        if (!post) {
            return {
                status: 'failed',
                message: 'post not found'
            }
        }
        else{
            return post;
        }
      } catch (err) {
        return {
            status: 'failed',
            message: err.message
        }
      }
  
}


const updatePost = async (postId,data)=>{
    console.log(postId,data);
    try {
        const post = await postModel.findByIdAndUpdate(postId, data, {
          new: true,
        });
        if (!post) {
            return {
                status: 'failed',
                message: 'post not found'
            }
        }
        else{
            return post;
        }
      } catch (err) {
        return {
            status: 'failed',
            message: err.message
        }
      }
}


const deletePost = async (postId)=>{

    try {
        const post = await postModel.findById(postId);
        if (!post) {
            return {
                status: 'failed',
                message: 'post not found'
            }
        }
        else{
            await post.deleteOne();
            return post;
        }
        
      } catch (error) {
        return {
            status: 'failed',
            message: error.message
        }
      }
}

const getAllPost = async () => {
    
    try {
        const posts = await postModel.find().populate("user_id", "name dp").sort({createdAt:-1});;
        return posts
    }
    catch (error) {
        return {
            status: 'failed',
            message: error.message
        }
    }


}

module.exports = 
{
    createPost,
    postUsingId,
    updatePost,
    deletePost,
    getAllPost
}