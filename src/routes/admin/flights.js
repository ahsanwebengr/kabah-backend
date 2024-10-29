import express from "express";
import {
  createFlights,
  updateFlights,
  deleteFlights,
  deleteAllFlights,
} from "../../controllers/admin.js/flights.js";

import { isAdmin } from "../../middleware/auth.js";
import { count } from "console";
const router = express.Router();
/**
 * @swagger
 * paths:
 *   /admin/flights:
 *     post:
 *       tags:
 *         - Admin
 *       summary: Create a new Flights
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 airline:
 *                   type: string
 *                   example: "PIA"
 *                 from:
 *                   type: string
 *                   example: "New York"
 *                 to:
 *                   type: string
 *                   example: "Los Angeles"
 *                 price:
 *                   type: number
 *                   example: 200.50
 *                 flightsNumber:
 *                   type: number
 *                   example: 12345
 *       responses:
 *         200:
 *           description: Flights created successfully
 *         400:
 *           description: Validation error
 */
router.post("/flights", isAdmin, createFlights);

/**
 * @swagger
 *   /admin/flights/{id}:
 *     put:
 *       tags:
 *         - Admin
 *       summary: Update a Flights
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: Flights ID
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 airline:
 *                   type: string
 *                   example: "PIA"
 *                 from:
 *                   type: string
 *                   example: "New York"
 *                 to:
 *                   type: string
 *                   example: "Los Angeles"
 *                 price:
 *                   type: number
 *                   example: 250.75
 *                 flytesNumber:
 *                   type: number
 *                   example: 54321
 *       responses:
 *         200:
 *           description: Flights updated successfully
 *         404:
 *           description: Flights not found
 */
router.put("/flights/:id", isAdmin, updateFlights);

/**
 * @swagger
 *   /admin/flights/{id}:
 *     delete:
 *       tags:
 *         - Admin
 *       summary: Delete a Flights
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: Flights ID
 *       responses:
 *         200:
 *           description: Flights deleted successfully
 *         404:
 *           description: Flights not found
 */
router.delete("/flights/:id", isAdmin, deleteFlights);

/**
 * @swagger
 *   /admin/flights:
 *     delete:
 *       tags:
 *         - Admin
 *       summary: Delete all Flights
 *       responses:
 *         200:
 *           description: All Flights deleted successfully
 */
router.delete("/flights", isAdmin, deleteAllFlights);

export default router;



