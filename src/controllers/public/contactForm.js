import Contact from "../../models/contactForm.js";
import { contact_form_validationSchema } from "../../verification/api_verification.js";
import { catchAsync, calculateDuration } from "../../middleware/utils.js";

export const contactForm = catchAsync(async (req, res) => {
  const { error, value } = contact_form_validationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  let { from_date, to_date } = value;
  let duration = calculateDuration(from_date, to_date);
  value.duration = duration;
  let contact = new Contact(value);
  await contact.save();
  res.status(201).json({ message: "Contact Created Successfully" });
});
