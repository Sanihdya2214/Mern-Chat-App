import express from "express"
import { sendMessage,getMessage } from "../controllers/message.controllers.js"
import protectRoute from "../Middlewares/protectRoutes.js"


const router = express.Router()

router.get("/:id", protectRoute, getMessage);

//This /send:id will give the userr who wants to send the message
//This protect rote message will check wheather the user is logged in or not only then he aor she can
//sent mesages.
router.post("/send/:id",protectRoute, sendMessage)


export default router