import express from "express";
import {
  getContactForm,
  contactForm,
  deleteAllContacts,
  deleteContact,
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
 *       description: Returns a paginated list of contacts.
 *       parameters:
 *         - name: page
 *           in: query
 *           description: Page number to retrieve (default is 1).
 *           required: false
 *           type: integer
 *           example: 1
 *           format: int32
 *         - name: limit
 *           in: query
 *           description: Number of contacts to retrieve per page (default is 12).
 *           required: false
 *           type: integer
 *           format: int32
 *           example: 12
 *         - name: type
 *           in: query
 *           description: The type of contact (e.g., "general", "hajj", "umrah").
 *           required: false
 *           type: string
 *           example: "general"
 *       responses:
 *         200:
 *           description: Successfully retrieved contacts
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Contacts retrieved successfully."
 *               pages:
 *                 type: integer
 *                 example: 5
 *               total:
 *                 type: integer
 *                 example: 50
 *               contacts:
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


/**
 * @swagger
 * paths:
 *   /admin/contacts:
 *     delete:
 *       summary: Delete all contacts
 *       tags:
 *         - Admin
 *       description: Deletes all contacts, optionally filtered by type.
 *       parameters:
 *         - name: type
 *           in: query
 *           description: The type of contacts to delete (e.g., "general", "hajj", "umrah"). If not provided, all contacts will be deleted.
 *           required: false
 *           type: string
 *           example: "general"
 *       responses:
 *         200:
 *           description: Successfully deleted contacts
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "All contacts deleted successfully."
 *         404:
 *           description: No contacts found to delete
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "No contacts found to delete."
 *         500:
 *           description: Internal server error
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Internal Server Error"
 */
router.delete("/contacts", deleteAllContacts);

/**
 * @swagger
 * paths:
 *   /admin/contacts/{id}:
 *     delete:
 *       summary: Delete a contact by ID
 *       tags:
 *         - Admin
 *       description: Deletes a specific contact from the database using its ID.
 *       parameters:
 *         - name: id
 *           in: path
 *           description: The ID of the contact to delete.
 *           required: true
 *           type: string
 *           example: "60d21b4667d0d8992e610c85"  
 *       responses:
 *         200:
 *           description: Successfully deleted the contact
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Contact deleted successfully."
 *         404:
 *           description: Contact not found
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Contact not found."
 *         500:
 *           description: Internal server error
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Internal Server Error"
 */
router.delete("/contacts/:id", deleteContact);
export default router;
