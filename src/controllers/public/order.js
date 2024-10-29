import Order from "../../models/order.js";
import { order_validationSchema } from "../../verification/api_verification.js";
import { catchAsync, sendEmail, fileReader } from "../../middleware/utils.js";

export const createOrder = catchAsync(async (req, res) => {
  const { error, value } = order_validationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  let order = new Order(value);
  console.log("🚀 ~ createOrder ~ order:", order)
  await order.save();


  res.status(201).json({ message: "Order Created Successfully" });

   let emailBody = await fileReader("../../orderForm.html", order);
   let toEmail = value.email
   await sendEmail(toEmail, emailBody);
});
