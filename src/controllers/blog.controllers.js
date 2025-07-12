const getBlogs=(req,res,next)=>{
    res.send("get blogs")
}

const getBlog=(req,res,next)=>{
    res.send("get a blog")
}

const postBlog=(req,res,next)=>{
    res.send("post a blog")
}

const updateBlog=(req,res,next)=>{
    res.send("update a blog")
}

const deleteBlog=(req,res,next)=>{
    res.send("delete a blog")
}

export {
    getBlogs,getBlog,postBlog,updateBlog,deleteBlog
}

