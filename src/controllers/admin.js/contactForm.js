import Contacts from "../../models/contactForm.js";
import { catchAsync } from "../../middleware/utils.js";

//getContactForm 
export const contactForm = catchAsync(async (req, res) => {
  const plan = await Contacts.findById(req.params.id);
  if (!plan) {
    return res.status(404).json({ message: "Contact Form Not Found" });
  }
  res.status(200).json({ message: "Contact Form Get Successfully", plan });
});


//getContactForm
export const getContactForm = catchAsync(async (req, res) => {
  let { page, limit } = req.query;
  limit = limit ? parseInt(limit) : 12;
  page = page ? parseInt(page) : 1;

  let contacts = await Contacts.find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip((page - 1) * limit);

  const totalContacts = await Contacts.countDocuments();
  contacts = {
    pages: Math.ceil(totalContacts / limit),
    total: totalContacts,
    contacts: contacts,
  };
  res.status(200).json({ message: "Contact Forms Get Successfully", contacts });
});



