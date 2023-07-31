import bcrypt from "bcrypt"
// import { Jwt } from "jsonwebtoken"
import User from "../models/User.js"

// register user
export const register = async (req,res) => {
    try{
        const  {
            firstName,
            lastName,
            email,
            password,
            firends,
            location,
            ocuupation
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt)
        const newUser = new User ({
            firstName,
            lastName,
            email,
            password:passwordHash,
            firends,
            location,
            ocuupation,
            viewdProfile: Math.floor(Math.random()*10000),
            impressions: Math.floor(Math.random()*10000),

        });
         const savedUser = await newUser.save();
         res.status(201).json(savedUser);

    } catch (err){
        res.status(500).json({error: err.message });

    }

};

// logging in 
export const  login =  async (req,res) => {
try{
    const {email, password} = req.body;
    const user = await User.findOne({ email : email});
    if (!user) return  res.status(400).json({msg: "User does not exist " });

    const isMatch = await  bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({msg: "invalid credentials " });

const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
req.User = verified ;
next();

}catch (err){
        res.status(500).json({error: err.message });

    }


}