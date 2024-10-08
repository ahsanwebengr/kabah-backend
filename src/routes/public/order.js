import express from "express";
import { createOrder } from "../../controllers/public/order.js";

const router = express.Router();

/**
 * @swagger
 * paths:
 *   /public/orders:
 *     post:
 *       summary: Create an order
 *       tags:
 *         - Public
 *       description: Endpoint to create a new order
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 full_name:
 *                   type: string
 *                   example: "Angelica Franks"
 *                   description: Full name of the traveler
 *                 contact_no:
 *                   type: integer
 *                   example: 1234567890
 *                   description: Contact number of the traveler
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: "mipexotox@mailinator.com"
 *                   description: Email address of the traveler
 *                 departure_date:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-01-10T00:00:00.000Z"
 *                   description: Date of departure in ISO 8601 format
 *                 children:
 *                   type: integer
 *                   example: 2
 *                   description: Number of children 
 *                 adults:
 *                   type: integer
 *                   example: 2
 *                   description: Number of adults 
 *                 plan_id:
 *                   type: string
 *                   example: "66faf2203c686cc08c4c7e74" 
 *                   description: ID of the plan (MongoDB ObjectId)  
*                 additional_info:
 *                   type: string
 *                   example: "Please provide a vegetarian meal option."
 *                   description: Additional information
 *       responses:
 *         '201':
 *           description: Order created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Order created successfully"
 *                   form_id:
 *                     type: string
 *                     example: "60f2c05396f3060015eb4d51"
 *         '400':
 *           description: Validation error or bad request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: "Invalid input data"
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: "Internal server error"
 */
router.post("/orders", createOrder);

export default router;
