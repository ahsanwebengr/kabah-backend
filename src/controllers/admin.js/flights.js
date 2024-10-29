import { catchAsync } from "../../middleware/utils.js";
import Flights from "../../models/flights.js";
import { flightsValidationSchema } from "../../verification/api_verification.js";
//create Flights
export const createFlights = catchAsync(async (req, res) => {
  let { error, value } = flightsValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
   value.to= value.to.toLowerCase().trim();
   value.from = value.from.toLowerCase().trim();
  let fly = new Flights(value);
  await fly.save();
  res.status(201).json({ message: "Flight Created successfully" });

});

// update Flights
export const updateFlights = catchAsync(async (req, res) => {
  const FlightsId = req.params.id;
  const updatedFlights = await Flights.findByIdAndUpdate(FlightsId, req.body, {
    new: true,
  });

  if (!updatedFlights) {
    return res.status(404).json({ error: "Flight not found" });
  }

  res.status(201).json({ message: "Flight updated successfully" });
});

//deleteFlights

export const deleteFlights = catchAsync(async (req, res) => {
  let flight = await Flights.findByIdAndDelete(req.params.id);
  if (!flight) {
    return res.status(404).json({ error: "flight Not Found" });
  }
  res.status(200).json({ message: "flight Deleted Successfully" });
});

//delete all Flightss
export const deleteAllFlights = catchAsync(async (req, res) => {
  await Flights.deleteMany({});
  res.status(200).json({ message: "Flights Deleted Successfully" });
});
