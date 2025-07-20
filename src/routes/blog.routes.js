import express from 'express'
import { deleteBlog, getBlog, getBlogForUpdate, getBlogFrom, getBlogs, getBlogsForAuthor, postBlog, updateBlog } from '../controllers/blog.controllers.js'
import { verifyRole ,auth} from '../middlewares/auth.js'

let router=express.Router()

router.get("/create",auth,verifyRole("author"),getBlogFrom)
router.get("/",auth,verifyRole("user"),getBlogs)  // /blogs
router.get("/author",auth,verifyRole("author"),getBlogsForAuthor) // /blogs/author
router.post("/",auth,verifyRole("author"),postBlog)
router.get("/:id",auth,getBlog)
router.get("/:id/edit",auth,verifyRole("author"),getBlogForUpdate)
router.put("/:id",auth,verifyRole("author"),updateBlog)
router.delete("/:id",auth,verifyRole("author"),deleteBlog)

export default router;