import express from 'express';
import { contactForm } from '../../controllers/public/contactForm.js';

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
 *                 full_name:
 *                   type: string
 *                   example: "John Doe"
 *                   description: Full name of the traveler
 *                 contact_no:
 *                   type: integer
 *                   example: 1234567890
 *                   description: Contact number of the traveler
 *                 email:
 *                   type: string
 *                   format: email
 *                   required: true
 *                   example: "mipexotox@mailinator.com"
 *                   description: Email address of the traveler
 *                 subject:
 *                   type: string
 *                   example: "Inquiry about package"
 *                   description: Subject of the contact form
 *                 departure_airport:
 *                   type: string
 *                   example: "Birmingham"
 *                   description: The airport from which the journey departs
 *                 hotel_category:
 *                   type: string
 *                   enum: [3_star, 4_star, 5_star, 2_star]
 *                   example: "3_star"
 *                   description: Category of the hotel
 *                 departure_date:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-01-10T00:00:00.000Z"
 *                   description: Date of departure in ISO 8601 format
 *                 arrival_date:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-01-20T00:00:00.000Z"
 *                   description: Date of arrival in ISO 8601 format
 *                 nights_in_makkah:
 *                   type: integer
 *                   example: 5
 *                   description: Number of nights spent in Makkah
 *                 nights_in_madinah:
 *                   type: integer
 *                   example: 3
 *                   description: Number of nights spent in Madinah
 *                 number_of_passengers:
 *                   type: integer
 *                   example: 4
 *                   description: Total number of passengers
 *                 children:
 *                   type: integer
 *                   example: 2
 *                   description: Number of children in the group
 *                 type:
 *                   type: string
 *                   enum: [price quote, contact]
 *                   example: "price quote"
 *                   description: The type of contact (price quote or contact)
 *                 your_message:
 *                   type: string
 *                   example: "I would like to inquire about your travel package."
 *                   description: Message or inquiry in the contact form
 *       responses:
 *         '201':
 *           description: Contact form created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Contact form created successfully"
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
router.post('/contacts', contactForm);

export default router;
