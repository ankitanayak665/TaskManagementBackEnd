const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
})

const signUpSchema = new mongoose.Schema({
    firstName: {
        type:String,
        require:true,
    },
    lastName: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        require:true,
    },
    password: {
        type:String,
        required:true,
        unique:true,
    },
    confirmPassword: {
        type:String,
        required:true,
    },
});

// Export both models
const User = mongoose.model('User', userSchema);
const Cred = mongoose.model('Cred', signUpSchema);

module.exports = { User, Cred };