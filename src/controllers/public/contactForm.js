import Contact from "../../models/contactForm.js";
import { contact_form_validationSchema } from "../../verification/api_verification.js";
import { catchAsync } from "../../middleware/utils.js";

export const contactForm = catchAsync(async (req, res) => {
  const { error } = contact_form_validationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  let contact = new Contact(req.body);
  await contact.save();
  res.status(201).json({ message: "Contact Created Successfully" });
});
