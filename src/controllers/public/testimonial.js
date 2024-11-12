import Testimonials from "../../models/testimonial.js";
import { catchAsync } from "../../middleware/utils.js";



//getTestimonial
export const getTestimonial = catchAsync(async (req, res) => {
  const testimonial = await Testimonials.findById(req.params.id);
  if (!testimonial) {
    return res.status(404).json({ error: "testimonial Not Found" });
  }
  res
    .status(200)
    .json({ message: "testimonial Get Successfully", testimonial });
});

//getTestimonials
export const getTestimonials = catchAsync(async (req, res) => {
  let { page, limit } = req.query;
  let query = {};
  limit = limit ? parseInt(limit) : 12;
  page = page ? parseInt(page) : 1;

  let testimonial = await Testimonials.find(query)
    .limit(limit)
    .skip((page - 1) * limit);
  let count = await Testimonials.countDocuments(query);
  let data = {
    pages: Math.ceil(count / limit),
    total: count,
    testimonials: testimonial,
  };

  return res
    .status(200)
    .json({ data, message: "testimonials Get Successfully" });
});

