import Testimonials from '../../models/testimonial.js';
import { catchAsync } from '../../middleware/utils.js';
import testimonial from '../../models/testimonial.js';

//create testimonial
export const createTestimonial = catchAsync(async (req, res) => {
  let check = await Testimonials.find({ name: req.body.name });
  if (check.length > 0) {
    return res.status(409).json({ error: 'testimonial Already Exists' });
  }

  if (!req.file) {
    return res.status(400).json({ error: 'Image is required' });
  }

  req.body.image = req.file.filename;

  let testimonial = new Testimonials(req.body);
  await testimonial.save();
  res.status(201).json({});
});

//getTestimonial
export const getTestimonial = catchAsync(async (req, res) => {
  const testimonial = await Testimonials.findById(req.params.id);
  if (!testimonial) {
    return res.status(404).json({ error: 'testimonial Not Found' });
  }
  res.status(200).json({ message: 'testimonial Get Successfully', testimonial });
});

//getTestimonials
export const getTesimonials = catchAsync(async (req, res) => {
  let { page, limit } = req.query;
  let query = {};
  limit = limit ? parseInt(limit) : 12;
  page = page ? parseInt(page) : 1;

  let testimonial = await Testimonials.find(query)
    .limit(limit)
    .skip((page - 1) * limit);
  let count = await Testimonials.countDocuments(query);
  data = {
    pages: Math.ceil(count / limit),
    total: count,
    testimonials: testimonial,
  };

  return res.status(200).json({ data, message: 'testimonials Get Successfully' });
});

//deleteTestimonial
export const deleteTestimonial = catchAsync(async (req, res) => {
  const testimonial = await Testimonials.findByIdAndDelete(req.params.id);
  if (!testimonial) {
    return res.status(404).json({ error: 'testimonial Not Found' });
  }
  res.status(200).json({ message: 'testimonial Deleted Successfully' });
});

//delete all testimonials
export const deleteAllTestimonials = catchAsync(async (req, res) => {
  await Testimonials.deleteMany({});
  res.status(200).json({ message: 'All testimonials Deleted Successfully' });
});

//updateTestimonial
export const updateTestimonial = catchAsync(async (req, res) => {
  const testimonialId = req.params.id;

  let testimonial = Testimonials.findById(testimonialId);

  if (req.file) {
    req.body.image = req.file.filename;
  } else {
    req.body.image = testimonial.image;
  }

  const updatedTestimonial = await Testimonials.findByIdAndUpdate(
    testimonialId,
    req.body,
    {
      new: true,
    }
  );

  if (!updatedTestimonial) {
    return res.status(404).json({ error: 'Testimonial not found' });
  }
  res.status(201).json({ message: 'Testimonial Updated Successfully' });
});
