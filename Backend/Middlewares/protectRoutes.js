import jwt from "jsonwebtoken"
import User from "../models/user.model.js"


const protectRoute = async (req,res,next) => {
     try {
       
         const token = req.cookies.jwt
         
         if (!token) {
            return  res.status(401).json({error:"Unauthorised -No Token Provided"})
         }
         const decoded = jwt.verify(token, process.env.JWT_SECRET)     
         
         if (!decoded) {
             return res
               .status(401)
               .json({ error: "Unauthorised -Invalid Token" });
         }
         
         const user = await User.findById(decoded.userId).select("-password") //Finding the user on the 
         //basis of id goten by the token and getting it by removing the password from it
         if (!user) {
             return res
               .status(404)
               .json({ error: "User Not Found" });
         }
         
            req.user = user //This is the currently authenticated user in our database
         
         next()

    } catch (error) {
         console.log("Error in protectRoute middleWare", error.message);
         res.status(500).json({ error: "Internal Server Error" });
    }
}


export default protectRoute