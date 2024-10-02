import express from "express";
import { contactForm } from "../../controllers/public/contactForm.js";

const router = express.Router();

/**
 * @swagger
 * paths:
 *   /public/contacts:
 *     post:
 *       summary: Create a contact form
 *       tags:
 *         - Public
 *       description: Endpoint to create a new contact
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 departure_airport:
 *                   type: string
 *                   example: "Birmingham"
 *                   description: The airport from which the journey departs
 *                 hotel_category:
 *                   type: string
 *                   enum: [3_star,4_star,5_star,economy]
 *                   example: "3_star"
 *                   description: Category of the hotel
 *                 type:
 *                   type: string
 *                   enum: [general,hajj,umrah]
 *                   example: "general"
 *                   description: type of the contacts
 *                 departure_date:
 *                   type: string
 *                   format: date-time
 *                   example: "2009-10-30T00:00:00.000Z"
 *                   description: Date of departure in ISO 8601 format
 *                 arrival_date:
 *                   type: string
 *                   format: date-time
 *                   example: "1977-01-24T00:00:00.000Z"
 *                   description: Date of arrival in ISO 8601 format
 *                 nights_in_makkah:
 *                   type: integer
 *                   example: 98
 *                   description: Number of nights spent in Makkah
 *                 nights_in_madinah:
 *                   type: integer
 *                   example: 8
 *                   description: Number of nights spent in Madinah
 *                 number_of_passengers:
 *                   type: integer
 *                   example: 746
 *                   description: Total number of passengers
 *                 children:
 *                   type: integer
 *                   example: 52
 *                   description: Number of children in the group
 *                 full_name:
 *                   type: string
 *                   example: "Angelica Franks"
 *                   description: Full name of the traveler
 *                 contact_no:
 *                   type: string
 *                   example: "1234567890"
 *                   description: Contact number of the traveler
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: "mipexotox@mailinator.com"
 *                   description: Email address of the traveler
 *       responses:
 *         '201':
 *           description: Travel plan created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Travel plan created successfully"
 *                   plan_id:
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
router.post("/contacts", contactForm);

export default router;
