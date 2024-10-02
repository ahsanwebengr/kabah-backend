import Blogs from "../../models/blog.js";
import { catchAsync } from "../../middleware/utils.js";

//createBlog
export const createBlog = catchAsync(async (req, res) => {

  let {slug,title} = req.body
  let check = await Blogs.findOne({title: title});
  if (check) {
    return res.status(409).json({ error: "Blog Already Exists" });
  }
  slug = title.toLowerCase();
  slug = slug.split(" ");
  slug = slug.slice(0, 2).join("-");
  req.body.slug = slug;
  let blog = new Blogs(req.body);
  await blog.save();
  res.status(201).json({});
});

//deleteBlogs
export const deleteBlog = catchAsync(async (req, res) => {
  const blog = await Blogs.findByIdAndDelete(req.params.id);
  if (!blog) {
    return res.status(404).json({});
  }
  res.status(200).json({});
});

//delete all Blogs
export const deleteAllBlogs = catchAsync(async (req, res) => {
  await Blogs.deleteMany({});
  res.status(200).json({});
});


//updateImages
export const updateImages = catchAsync(async (req, res) => {
  
});