import Blogs from '../../models/blog.js';
import { catchAsync } from '../../middleware/utils.js';

//getBlog
export const getBlogById = catchAsync(async (req, res) => {
  const blog = await Blogs.findById(req.params.id);
  if (!blog) {
    return res.status(404).json({ error: 'Blog Not Found' });
  }
  res.status(200).json({ blog });
});

//getBlogs
export const getBlogs = catchAsync(async (req, res) => {
  let { page, limit } = req.query;
  limit = limit ? parseInt(limit) : 12;
  page = page ? parseInt(page) : 1;

  let query = {};
  let blog = await Blogs.find(query)
    .limit(limit)
    .skip((page - 1) * limit);
  let count = await Blogs.countDocuments(query);
  blog = {
    pages: Math.ceil(count / limit),
    total: count,
    blogs: blog,
  };

  return res.status(200).json({ blog });
});
