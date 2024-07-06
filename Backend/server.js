import express from "express"
import dotenv from "dotenv"


import authroutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/users.routes.js";


import connectMongodb from "./db/connectMongodb.js"
import cookieParser from "cookie-parser"

const app = express()
dotenv.config();
const Port = process.env.PORT || 6000;


app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authroutes); //To parse the incoming requests from json payloads ( from req.body)
app.use("/api/messages", messageRoutes);
app.use("/api/users",userRoutes)
// app.get("/", (req, res) => {
//     res.send("Hello")
// })





app.listen(Port, () => {
    connectMongodb()
    console.log(`Server is running on the port:${Port}`)
})