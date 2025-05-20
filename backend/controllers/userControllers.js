import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 

import userModel from "../models/userModels.js";

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // Compare password
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(400).json({ success: false, message: "Invalid email or password" });
    // }

    // Generate token
    const token = createToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


const registerUser=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        if(!name ||!email || !password){
            return res.status(400).json({message:"please fill all requires fields"});
            
        }
        const exists=await userModel.findOne({email});
        if(exists){
            return res.status(400).json({message:"user already exists"});
        }
        if(!validator.isEmail(email)){
          return res.json({success:false,message:"Invalid email address"})  
        }
        if(password.length <8){
            return res.json({success:false,message:"Please enter a strong password"});
        }
        const salt =await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=new userModel({
            name,email,password
        })
        const user=await newUser.save();
        const token=createToken(user._id);
        res.json({success:true,message:"User created successfully",token})
    }catch(error){

        return res.status(500).json({message:error.message})
    }

}
export {loginUser,registerUser};