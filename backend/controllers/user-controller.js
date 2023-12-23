import User from "../model/User.js"
import bcrypt from "bcryptjs"

export const getAllUser = async(req, res, next) => {
    let users;
    try {
        users = await User.find({});
    }catch (err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message: "no users found"});

    }

    return res.status(200).json({users})
}

export const signup = async(req, res, next) => {
    const {name, email, password} = req.body;
    let existingUser;

    try {
        existingUser = await User.findOne({email});
    }

    catch {
        return console.log(err);
    }
    if(existingUser){
        return res.status(400).json({message: "Bad Request: User already present"});
    }
    const hashPassword = bcrypt.hashSync(password);
    
    const user = new User({
        name,
        email,
        password: hashPassword,
        blogs: []
    });
    try {
        await user.save();
    }

    catch {
        return console.log(err);
    }
    return res.status(200).json({user})
}

export const login  = async(req, res, next) => {
    const {email, password} = req.body;
    let existingUser;

    try {
        existingUser = await User.findOne({email});
    }

    catch {
        return console.log(err);
    }
    if(!existingUser){
        return res.status(404).json({message: "User not present"});
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

    if(!isPasswordCorrect){
        return res.status(400).json({message: "Incorrect Password"});
    }
    return res.status(200).json({message: "Successfully logged in"});
}