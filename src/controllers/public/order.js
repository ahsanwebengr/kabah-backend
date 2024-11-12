import Order from "../../models/order.js";
import Plan from "../../models/plan.js";
import { order_validationSchema } from "../../verification/api_verification.js";
import { catchAsync, sendEmail, fileReader } from "../../middleware/utils.js";
import mongoose from "mongoose";

export const createOrder = catchAsync(async (req, res) => {
  let { error, value } = order_validationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  let plan_id = req.params.plan_id
  let plan = await Plan.findById(plan_id);
  if (!plan) {
    return res.status(404).json({ error: "Plan not found" });
  }
  plan = plan.heading;
  value.plan_id = plan_id;
  let order = new Order(value);
  await order.save();
  order.plan_heading = plan;

  res.status(201).json({ message: "Order Created Successfully" });
  let emailBody = await fileReader("../../orderForm.html", order);
  let toEmail = value.email;
  await sendEmail(toEmail, emailBody);
});
