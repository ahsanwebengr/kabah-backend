import Blogs from "../../models/blog.js";
import { catchAsync } from "../../middleware/utils.js";

//createBlog
export const createBlog = catchAsync(async (req, res) => {
  let { slug, title } = req.body;
  if (!req.file) {
    return res.status(400).json({ error: "Image is required" });
  }
  let check = await Blogs.findOne({ title: title });
  if (check) {
    return res.status(409).json({ error: "Blog Already Exists" });
  }
  slug = title.toLowerCase();
  slug = slug.split(" ");
  slug = slug.slice(0, 2).join("-");
  req.body.slug = slug;
  req.body.image = req.file.filename;
  let blog = new Blogs(req.body);
  await blog.save();
  res.status(201).json({ message: "Blog Created Successfully" });
});

// update Blog
export const updateBlog = catchAsync(async (req, res) => {
  const blogId = req.params.id;
  let { slug, title } = req.body;
  let checkTitle = await Blogs.findOne({ title: title, _id: { $ne: blogId } });
   console.log("🚀 ~ updateBlog ~ checkTitle:", checkTitle)
   
   if (!req.file) {
     req.body.image = checkTitle?.image;
   } else {
     req.body.image = req.file.filename;
   }

  slug = title.toLowerCase().split(" ").slice(0, 2).join("-");
  req.body.slug = slug;
  if (checkTitle) {
    return res.status(409).json({ error: "Title Already Exists" });
  }

  const updatedBlog = await Blogs.findByIdAndUpdate(blogId, req.body, {
    new: true,
  });

  if (!updatedBlog) {
    return res.status(404).json({ error: "Blog not found" });
  }

  res.status(200).json({ message: "Blog updated successfully" });
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
export const updateImages = catchAsync(async (req, res) => {});
