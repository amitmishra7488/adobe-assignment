const userModel = require('../models/user.model')


const createUser = async (data) => {

    try {
        const userExist = await userModel.findOne({ email: data.email });
        if (userExist) {
            console.log("user already exists")
            return {
                status: "failed",
                message: "user already exists"
            }
        }
        else{
            await userModel.create(data);
            return data;
        }
    }
    catch (e) {
        return {
            status: e._message,
        }
    }
}


const loginUser = async (data) => {

    const userExist = await userModel.findOne({ email: data.email });
    
    try {
        
        if (userExist) {
            return userExist;
        }
        else {
            return {
                status: 'failed',
                message: "check ur password or email"
            }
        }
    }
    catch (error) {
        return {
            status: 'failed',
            message: 'email and password required for login'
        }
    }

}


const userProfile = async (userId) => {

    try {
        const user = await userModel.findById(userId);
        console.log(user);
        if (!user) {
            return {
                status: 'failed',
                message: 'user not found'
            }
        }
        else{
            return user;
        }
      } catch (err) {
        return {
            status: 'failed',
            message: err.message
        }
      }
    
    
}


const updateUser = async (userId,data)=>{
    console.log(userId,data);
    try {
        const user = await userModel.findByIdAndUpdate(userId, data, {
          new: true,
        });
        if (!user) {
            return {
                status: 'failed',
                message: 'user not found'
            }
        }
        else{
            return user;
        }
      } catch (err) {
        return {
            status: 'failed',
            message: err.message
        }
      }
}


const deleteUser = async (userId)=>{

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return {
                status: 'failed',
                message: 'user not found'
            }
        }
        else{
            await user.deleteOne();
            return user;
        }
        
      } catch (error) {
        return {
            status: 'failed',
            message: error.message
        }
      }
}


const getAllUser = async () => {
    
    try {
        const users = await userModel.find();
        return users
    }
    catch (error) {
        return {
            status: 'failed',
            message: 'Try to login again'
        }
    }


}






module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    userProfile,
    getAllUser,
}