import Order from "../../models/order.js";
import { catchAsync } from "../../middleware/utils.js";

//getOrderById
export const getOrderById = catchAsync(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("plan_id");
  if (!order) {
    return res.status(404).json({ error: "Order Not Found" });
  }
  res.status(200).json({ order });
});

//getOrders
export const getOrders = catchAsync(async (req, res) => {
  let { page, limit, type } = req.query;
  limit = limit ? parseInt(limit) : 12;
  page = page ? parseInt(page) : 1;
  let query = {};
  if (type) {
    query = { type: type };
  }

  let order = await Order.find(query)
    .populate("plan_id")
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip((page - 1) * limit);

  const totalOrder = await Order.countDocuments(query);
  order = {
    pages: Math.ceil(totalOrder / limit),
    total: totalOrder,
    order: order,
  };
  res.status(200).json({ order });
});

// deleteAllOrders
export const deleteAllOrders = catchAsync(async (req, res) => {
  let { type } = req.query;
  let query = {};
  if (type) {
    query = { type: type };
  }
  await Order.deleteMany(query);
  res.status(200).json({ message: "All Orders Deleted Successfully" });
});

// deleteOrderById
export const deleteOrderById = catchAsync(async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) {
    return res.status(404).json({ error: "Order Not Found" });
  }
  res.status(200).json({ message: "Order Deleted Successfully" });
});

export const updateOrder = catchAsync(async (req, res) => {
  if (!req.body.status) {
    return res.status(400).json({ error: "Status is required" });
  }

  console.log("Updating status to:", req.body.status);

  let order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    {
      new: true,
    }
  );

  // Check if the contact was found
  if (!order) {
    return res.status(404).json({ error: "order Not Found" });
  }

  res.status(200).json({ message: "Order Updated Successfully" });
});
