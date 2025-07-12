import express from 'express'
import { deleteBlog, getBlog, getBlogForUpdate, getBlogFrom, getBlogs, postBlog, updateBlog } from '../controllers/blog.controllers.js'
import auth from '../middlewares/auth.js'

let router=express.Router()

router.get("/create",auth,getBlogFrom)
router.get("/",auth,getBlogs)
router.post("/",auth,postBlog)
router.get("/:id",auth,getBlog)
router.get("/:id/edit",auth,getBlogForUpdate)
router.put("/:id",auth,updateBlog)
router.delete("/:id",auth,deleteBlog)

export default router;