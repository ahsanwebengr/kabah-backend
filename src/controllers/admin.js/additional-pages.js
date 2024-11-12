import slugify from "slugify";

import { catchAsync } from "../../middleware/utils.js";
import AdditionalPage from "../../models/additional-pages.js";

const createAdditionalPages = catchAsync(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  const slug = slugify(title, { lower: true, strict: true });

  const existingPage = await AdditionalPage.findOne({ slug });
  if (existingPage) {
    return res
      .status(403)
      .json({ error: "A page with this title already exists" });
  }

  const newPage = await AdditionalPage.create({ title, content, slug });
  res
    .status(201)
    .json({ message: "Additional Page Created Successfully", newPage });
});

const getAdditionalPages = catchAsync(async (req, res) => {
  const pages = await AdditionalPage.find();
  res.status(200).json({ pages });
});

const getOneAdditionalPage = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const page = await AdditionalPage.findOne({ slug });

  if (!page) {
    return res.status(404).json({ error: "Page Not Found" });
  }

  res.status(200).json({ page });
});

const updateAdditionalPage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const update = {
    ...(title && {
      title,
      slug: slugify(title, { lower: true, strict: true }),
    }),
    ...(content && { content }),
  };

  const page = await AdditionalPage.findByIdAndUpdate(id, update, {
    new: true,
  });

  if (!page) {
    return res.status(404).json({ error: "Page Not Found" });
  }

  res
    .status(200)
    .json({ message: "Additional Page Updated Successfully", page });
});

const deleteAdditionalPage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const page = await AdditionalPage.findByIdAndDelete(id);

  if (!page) {
    return res.status(404).json({ error: "Page Not Found" });
  }

  res.status(200).json({ message: "Additional Page Deleted Successfully" });
});

export {
  createAdditionalPages,
  getAdditionalPages,
  getOneAdditionalPage,
  updateAdditionalPage,
  deleteAdditionalPage,
};
