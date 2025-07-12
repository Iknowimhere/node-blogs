import express from 'express'
import { welcome } from '../controllers/welcome.controllers.js'

let router=express.Router()

router.get("/",welcome)

export default router