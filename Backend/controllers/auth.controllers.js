import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import generateTokenAndSetCookie from "../utils/generateToken.js";


export const login = async (req, res) => {
    try {
      const { username, password } = req.body
      const user = await User.findOne({ username })
      
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "") //here this(|| ""  is useed so that it dont run the ctahc function 
       // it will simply retun false in isPasswordCorrect)
      
      if (!user || !isPasswordCorrect) {
        return res.status(400).json({ error: "Invalid username or password" });
      }
      
      generateTokenAndSetCookie(user._id, res)
      
      res.status(200).json({
             _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
      })

   } catch (error) {
       console.log("Error in Login component", error.message);
       res.status(500).json({ error: "Internal Server Error" });
    }
};

export const signup = async (req, res) => {
  try {
      const{username,fullName,password,confirmPassword,gender}=req.body
    if (password != confirmPassword) {
      return res.status(400).json({ error: "Passwords dont match" });
    }
      const user = await User.findOne({ username });
      if (user) {
          return res.status(400).json({error:" Username already Exist"})
      }
   //Hashing the Password
      const salt = await bcrypt.genSalt(10)
      const hashPassword= await bcrypt.hash(password,salt)

    const BoyProifilepic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
      const GirlProifilepic = `https://avatar.iran.liara.run/public/girld?username=${username}`;
      
      const newUser = new User({
          fullName,
          username,
          password:hashPassword,
          gender,
           profilePic : gender==="male"? BoyProifilepic:GirlProifilepic,
          })
      if (newUser) {
        //Gnerate the JWT token
         generateTokenAndSetCookie(newUser._id,res)
          await newUser.save();

          res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic,
          });

      } else {
          res.status(400).json({error:"Invalid user Data"})
      }
  } catch (error) {
      console.log( "Error in signup component",error.message )
      res.status(500).json({error:"Internal Server Error"})
}
};

export const logout =  (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({message: "Logged Out Successfully"})
  } catch (error) {
    console.log("Error in signup component", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
 
};
