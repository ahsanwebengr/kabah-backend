import express from "express";
import {
  getFlightsById,
  getFlights,
} from "../../controllers/public/flights.js";

const router = express.Router();

/**
 * @swagger
 * paths:
 *   /public/flights/{id}:
 *     get:
 *       summary: Retrieve a specific Flights
 *       tags:
 *         - Public
 *       description: Fetches the details of a specific Flights by its ID.
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the Flights to retrieve.
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Flights retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   flyte:
 *                     type: object
 *                     properties:
 *                       from:
 *                         type: string
 *                         example: "New York"
 *                       to:
 *                         type: string
 *                         example: "Los Angeles"
 *                       airline:
 *                         type: string
 *                         example: "San Francisco"
 *                       price:
 *                         type: number
 *                         example: 200.50
 *                       flytesNumber:
 *                         type: number
 *                         example: 12345
 *         '404':
 *           description: Flights not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 */
router.get("/flights/:id", getFlightsById);

/**
 * @swagger
 * paths:
 *   /public/flights:
 *     get:
 *       summary: Retrieve a list of Flights
 *       tags:
 *         - Public
 *       description: List of all Flights with pagination, filtering by `from`, `to`, 
 *       parameters:
 *         - name: page
 *           in: query
 *           required: false
 *           description: The page number to retrieve (default is 1).
 *           schema:
 *             type: integer
 *             example: 1
 *         - name: limit
 *           in: query
 *           required: false
 *           description: The number of Flights to retrieve per page (default is 12).
 *           schema:
 *             type: integer
 *             example: 12
 *         - name: from
 *           in: query
 *           required: false
 *           description: The departure location filter.
 *           schema:
 *             type: string
 *             example: "New York"
 *         - name: to
 *           in: query
 *           required: false
 *           description: The destination location filter.
 *           schema:
 *             type: string
 *             example: "Los Angeles"
 *       responses:
 *         '200':
 *           description: Flights retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   plan:
 *                     type: object
 *                     properties:
 *                       pages:
 *                         type: integer
 *                         description: Total number of pages available
 *                         example: 10
 *                       total:
 *                         type: integer
 *                         description: Total number of Flights available
 *                         example: 100
 *                       Flights:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             from:
 *                               type: string
 *                               example: "New York"
 *                             to:
 *                               type: string
 *                               example: "Los Angeles"
 *                             price:
 *                               type: number
 *                               example: 200.50
 *                             flightNumber:
 *                               type: string
 *                               example: "AB1234"
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Internal server error"
 */
router.get("/flights", getFlights);

export default router;
