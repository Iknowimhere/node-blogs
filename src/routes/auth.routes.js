import express from 'express'
import { getSignin, getSignup, signin, signup } from '../controllers/auth.controllers.js';
let router =express.Router()

router.post("/signup",signup)
router.post("/signin",signin)
router.get("/signup",getSignup)
router.get("/signin",getSignin)


export default router;