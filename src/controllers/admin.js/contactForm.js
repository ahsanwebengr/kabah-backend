import Contacts from "../../models/contactForm.js";
import Blogs from "../../models/blog.js";
import Orders from "../../models/order.js";
import Plans from "../../models/plan.js";
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
    query = { type: type };
  }
  let contacts = await Contacts.deleteMany(query);
  console.log("🚀 ~ deleteAllContacts ~ contacts:", contacts)
  if (contacts.deletedCount === 0) {
    return res.status(404).json({ error: "No Contacts Found to Delete" });
  }

  res.status(200).json({ message: "All Contacts Deleted Successfully" });
});

// update contacts

export const updateContacts = catchAsync(async (req, res) => {
  if (!req.body.status) {
    return res.status(400).json({ error: "Status is required" });
  }

  console.log("Updating status to:", req.body.status);

  const contacts = await Contacts.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    {
      new: true,
    }
  );

  // Check if the contact was found
  if (!contacts) {
    return res.status(404).json({ error: "Contact Not Found" });
  }

  // Return the updated contact
  res.status(200).json({ message: "Contact Updated Successfully", contacts });
});

// delete by id
export const deleteContact = catchAsync(async (req, res) => {
  const contacts = await Contacts.findByIdAndDelete(req.params.id);
  if (!contacts) {
    return res.status(404).json({});
  }
  res.status(200).json({});
});

// stats
export const stats = catchAsync(async (req, res) => {
  const totalContacts = await Contacts.countDocuments();
  const completeContacts = await Contacts.countDocuments({
    status: "complete",
  });
  const pendingContacts = await Contacts.countDocuments({
    status: "pending",
  });



  const totalBlogs = await Blogs.countDocuments();
  const totalReservations = await Orders.countDocuments();
  const totalHajjPlans = await Plans.countDocuments({ category: "hajj" });
  const totalUmrahPlans = await Plans.countDocuments({ category: "umrah" });
  const totalPlans = await Plans.countDocuments();

  res.status(200).json({
    totalContacts,
    completeContacts,
    pendingContacts,
    totalBlogs,
    totalReservations,
    totalHajjPlans,
    totalUmrahPlans,
    totalPlans,
  });
});
