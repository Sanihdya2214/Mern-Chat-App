import express from "express"
import dotenv from "dotenv"
import path from "path";

import authroutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/users.routes.js";
import { app,server } from "./socket/socket.js";

import connectMongodb from "./db/connectMongodb.js"
import cookieParser from "cookie-parser"

dotenv.config();

const __dirname = path.resolve();
const Port = process.env.PORT || 6000;


app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authroutes); //To parse the incoming requests from json payloads ( from req.body)
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes)

//Deployment Part
app.use(express.static(path.join(__dirname, "/Frontend/dist")));


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"));
});


//updated from app.listen to server.listen for making it a socket server
server.listen(Port, () => {
    connectMongodb()
    console.log(`Server is running on the port:${Port}`)
})