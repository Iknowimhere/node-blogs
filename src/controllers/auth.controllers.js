import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
const signup = async (req, res, next) => {
  try {
    let { username, email, password, confirmPassword } = req.body;
    // check for existing user
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists please Login" });
    }
    let newUser = await User.create({
      username,
      email,
      password,
      confirmPassword,
    });
    let token=await jwt.sign({id:newUser._id},process.env.JWT_SECRET,{
        expiresIn:'1d'
    })
    res.status(201).json({ user:newUser,token});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const signin = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "User doesn't exist Please Register" });
    }
    //verifying password
    let isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password is wrong!" });
    }
    let token=await jwt.sign({id:existingUser._id},process.env.JWT_SECRET,{
        expiresIn:'1d'
    })
    res.status(200).json({ user: existingUser,token});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { signin, signup };
