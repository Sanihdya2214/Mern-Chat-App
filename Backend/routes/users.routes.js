import express from "express"
import protectRoute from "../Middlewares/protectRoutes.js"
import { getUsersForSideBar } from "../controllers/users.controllers.js"

const router = express.Router()


router.get("/", protectRoute ,getUsersForSideBar)

export default router
