import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import plan from "./src/routes/admin/plan.js";
import blog from "./src/routes/admin/blog.js"
import contact_form from "./src/routes/public/contact.js";
import getContactForm from "./src/routes/admin/contactForm.js";
import publicPlan from "./src/routes/public/plan.js";
export const app = express();

app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "100mb" }));


// admin routes
app.use("/admin", plan);
app.use("/admin", getContactForm);
app.use("/admin",blog)

// public routes
app.use("/public", contact_form);
app.use("/public",publicPlan)