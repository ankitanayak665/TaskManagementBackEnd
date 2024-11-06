const {User} = require('../models/userModel')
const {Cred} = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async(req,res)=>{
    try {
        const login = {
          email: req.body.email,
          password: req.body.password,
        };
    
        // Save the new task in the database
        const result = await Cred.findOne({ email: req.body.email});
        if(!result){
          // Send a response back to the client
        res.status(403).json({ message: "Authentication Failed", success: false});
        }
        const isPasswordEqual = await bcrypt.compare(req.body.password,result.password)
        if(!isPasswordEqual){
            // Send a response back to the client
          res.status(403).json({ message: "Authentication Failed", success: false});
          }
          
        const jwtToken = jwt.sign({
            email: req.body.email,_id:req.body._id},
            process.env.JWT_SECRET || "SECRET-123",
            {
                expiresIn:'24h'
            }
        )

        res.status(200).json({
            message: "Login Success",
            success:true,
            jwtToken,
        })

      } catch (error) {
        res.status(500).json({ error: "Failed to login" });
      }
}
const signup = async(req,res)=>{
    
    try {
        const signUp = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          confirmPassword: req.body.confirmPassword,
        };
        //check if use exits

    const isEmail = await Cred.findOne({ email: req.body.email });

        if(isEmail){
            return res.status(409).json({message:"User already exists",success:false})
        }else{
        const userModel = new Cred(signUp)
        userModel.password = await bcrypt.hash(signUp.password,10);
        await userModel.save();
        // Send a response back to the client
         return res.status(201).json({ message: "Signup successfully", success:true});
        }
      } catch (error) {
        res.status(500).json({ error: "Failed to signup" });
      }
}

module.exports ={
    login,signup
}