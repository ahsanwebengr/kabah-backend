import { catchAsync } from "../../middleware/utils.js";
import Flights from "../../models/flights.js";

// get flights By ID
export const getFlightsById = catchAsync(async (req, res) => {
  let flight = await Flights.findById(req.params.id);
  if (!flight) {
    return res.status(404).json({ error: "flight Not Found" });
  }
  res.status(200).json({ flight });
});

// get flights
export const getFlights = catchAsync(async (req, res) => {
  let { page, limit, category } = req.query;
  let query = {};
  if (category) {
    query.category = category;
  }
  limit = limit ? parseInt(limit) : 12;
  page = page ? parseInt(page) : 1;

  let plan = await Flights.find(query)
    .limit(limit)
    .skip((page - 1) * limit);
  let count = await Flights.countDocuments(query);
  plan = {
    pages: Math.ceil(count / limit),
    total: count,
    Flights: plan,
  };

  return res.status(200).json({ plan });
});
