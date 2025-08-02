import Blog from '../models/blog.model.js';

const getBlogs = async (req, res, next) => {
  try {
    console.log('on blogs', req.userId);

    let blogs = await Blog.find();
    res.render('blogs', { blogs: blogs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBlogsForAuthor = async (req, res, next) => {
  try {
    let blogs = await Blog.find({ authorId: req.userId });
    console.log('blogs for author', blogs);

    res.render('authorDashboard', { blogs: blogs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBlog = async (req, res, next) => {
  let { id } = req.params;
  try {
    let singleBlog = await Blog.findById(id);
    // res.status(200).json(singleBlog)
    res.render('singleBlog', { blog: singleBlog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBlogForUpdate = async (req, res, next) => {
  let { id } = req.params;
  try {
    let singleBlog = await Blog.findById(id);
    // res.status(200).json(singleBlog)
    res.render('updateBlog', { blog: singleBlog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postBlog = async (req, res, next) => {


  let { title, description } = req.body;
  console.log(req.files);
  console.log(req.file);
  
  try {
    let newBlog = await Blog.create({
      title,
      description,
      image:req.file.path,
      authorId: req.userId,
    });
    console.log('new blog created', newBlog);
    
    if (!newBlog) {
      res.status(400).json({
        message: 'Error creating blog',
      });
      return;
    }
    res.redirect('/blogs/author');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBlog = async (req, res, next) => {
  let { id } = req.params;
  try {
    let udpatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    // res.status(200).json(udpatedBlog)
    res.redirect('/blogs');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBlog = async (req, res, next) => {
  let { id } = req.params;
  try {
    await Blog.findByIdAndDelete(id);
    res.status(200).json({ message: 'Blog deleted Successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBlogFrom = (req, res, next) => {
  res.render('createBlog');
};

export {
  getBlogs,
  getBlog,
  postBlog,
  updateBlog,
  deleteBlog,
  getBlogFrom,
  getBlogForUpdate,
  getBlogsForAuthor,
};
