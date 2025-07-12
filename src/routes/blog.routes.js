import express from 'express'
import { deleteBlog, getBlog, getBlogs, postBlog, updateBlog } from '../controllers/blog.controllers.js'

let router=express.Router()

router.get("/",getBlogs)
router.post("/",postBlog)
router.get("/:id",getBlog)
router.put("/:id",updateBlog)
router.delete("/:id",deleteBlog)

export default router;