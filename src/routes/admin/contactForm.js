import express from "express";
import {
  getContactForm,
  contactForm,
} from "../../controllers/admin.js/contactForm.js";
const router = express.Router();

/**
 * @swagger
 * paths:
 *   /admin/contacts:
 *     get:
 *       summary: Retrieve a list of contacts
 *       tags:
 *         - Admin
 *       description: Returns a paginated list of contacts  form.
 *       parameters:
 *         - name: page
 *           in: query
 *           description: Page number to retrieve (default is 1)
 *           required: false
 *           type: integer
 *           format: int32
 *         - name: limit
 *           in: query
 *           description: Number of contacts to retrieve per page (default is 12)
 *           required: false
 *           type: integer
 *           format: int32
 *       responses:
 *         200:
 *           description: Successfully retrieved contacts
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Contact Get Successfully"
 *               pages:
 *                 type: integer
 *                 example: 5
 *               total:
 *                 type: integer
 *                 example: 50
 *               AIs:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d5ec49a3e2b15f4c9b1a0b"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     message:
 *                       type: string
 *                       example: "Hello, I have a question."
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-09-01T12:34:56Z"
 *         500:
 *           description: Internal server error
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Internal Server Error"
 */
router.get("/contacts", getContactForm);

/**
 * @swagger
 * paths:
 *  /admin/contacts/{id}:
 *    get:
 *      summary: Retrieve a specific contact form
 *      tags:
 *         - Admin
 *      description: Get a contact form by its ID.
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: The ID of the contact form to retrieve.
 *          type: string
 *      responses:
 *        200:
 *          description: Contact form retrieved successfully.
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *              plan:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                  name:
 *                    type: string
 *                  email:
 *                    type: string
 *                  message:
 *                    type: string
 *        404:
 *          description: Contact form not found.
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 */
router.get("/contacts/:id", contactForm);

export default router;
