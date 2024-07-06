import jwt from "jsonwebtoken"

const generateTokenAndSetCookie = (userId, res)=>{
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
          expiresIn:"15d"
      }) //openssl rand -base64 32(Command in git bash for getting a secreet key)

    res.cookie("jwt", token, {
        //These things are done to prevent from attacks on the sites
        maxAge:15*24*60*60*1000 ,//MS
        httpOnly: true,
        sameSite: "strict",
         secure:process.env.NODE_ENV !== "developement",

    })
}

export default generateTokenAndSetCookie