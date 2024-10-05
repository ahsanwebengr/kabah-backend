import Contacts from "../../models/contactForm.js";
import { catchAsync } from "../../middleware/utils.js";

//getContactForm
export const contactForm = catchAsync(async (req, res) => {
  const contacts = await Contacts.findById(req.params.id);
  if (!contacts) {
    return res.status(404).json({ error: "Contact Form Not Found" });
  }
  res.status(200).json({ contacts });
});

//getContactForm
export const getContactForm = catchAsync(async (req, res) => {
  let { page, limit, type } = req.query;
  limit = limit ? parseInt(limit) : 12;
  page = page ? parseInt(page) : 1;
  let query = {};
  if (type) {
    query = { type: type };
  }

  let contacts = await Contacts.find(query)
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip((page - 1) * limit);

  const totalContacts = await Contacts.countDocuments(query);
  contacts = {
    pages: Math.ceil(totalContacts / limit),
    total: totalContacts,
    contacts: contacts,
  };
  res.status(200).json({ contacts });
});

// delete all contacts
export const deleteAllContacts = catchAsync(async (req, res) => {
  let { type } = req.query;
  let query = {};
  if (type) {
    query = {type: type};
  }
  await Contacts.deleteMany(query);
  res.status(200).json({});
});

// delete by id
export const deleteContact = catchAsync(async (req, res) => {
  const contacts = await Contacts.findByIdAndDelete(req.params.id);
  if (!contacts) {
    return res.status(404).json({});
  }
  res.status(200).json({});
});
