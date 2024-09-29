import Blogs from "../../models/blog.js";
import { catchAsync } from "../../middleware/utils.js";

//createBlog
export const createBlog = catchAsync(async (req, res) => {

  let check = await Blogs.find({ title: req.body.title });
  if (check.length > 0) {
    return res.status(409).json({ message: "Blog Already Exists" });
  }
  let blog = new Blogs(req.body);
  await blog.save();
  res.status(201).json({ message: "Blog Created Successfully" });
});

//deleteBlogs
export const deleteBlog = catchAsync(async (req, res) => {
  const blog = await Blogs.findByIdAndDelete(req.params.id);
  if (!blog) {
    return res.status(404).json({ message: "Blog Not Found" });
  }
  res.status(200).json({ message: "Blog Deleted Successfully" });
});

//delete all Blogs
export const deleteAllBlogs = catchAsync(async (req, res) => {
  await Blogs.deleteMany({});
  res.status(200).json({ message: "All Blogs Deleted Successfully" });
});