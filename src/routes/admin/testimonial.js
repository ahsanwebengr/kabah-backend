import express from "express";
import {
  createTestimonial,
  deleteTestimonial,
  updateTestimonial,
  deleteAllTestimonials,
} from "../../controllers/admin.js/testimonial.js";

import { isAdmin } from "../../middleware/auth.js";
import { fileUploader } from "../../middleware/multer.js";

const router = express.Router();

/**
 * @swagger
 * /admin/testimonials:
 *   post:
 *     summary: Create a new testimonial
 *     tags: [Admin]
 *     description: Endpoint to create a new testimonial.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 description: The rating of the testimonial.
 *                 example: 5
 *               review:
 *                 type: string
 *                 description: The review content of the testimonial.
 *                 example: "Great service, highly recommend!"
 *               name:
 *                 type: string
 *                 description: The name of the person giving the testimonial.
 *                 example: "John Doe"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file of the testimonial (upload).
 *               platform:
 *                 type: string
 *                 description: The platform from where the testimonial was collected.
 *                 example: "Facebook"
 *     responses:
 *       '201':
 *         description: Successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60f2c05396f3060015eb4d51"
 *                 rating:
 *                   type: number
 *                   example: 5
 *                 review:
 *                   type: string
 *                   example: "Great service, highly recommend!"
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 image:
 *                   type: string
 *                   example: "https://example.com/image.jpg"
 *                 platform:
 *                   type: string
 *                   example: "Facebook"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-09-20T12:34:56Z"
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Validation error"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.post("/testimonials", fileUploader("image", "testimonials"), isAdmin, createTestimonial);


/**
 * @swagger
 * /admin/testimonials/{id}:
 *   put:
 *     summary: Update an existing testimonial
 *     tags: [Admin]
 *     description: Endpoint to update an existing testimonial by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the testimonial to update.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 description: The updated rating of the testimonial.
 *                 example: 4
 *               review:
 *                 type: string
 *                 description: The updated review content of the testimonial.
 *                 example: "Improved experience with the service."
 *               name:
 *                 type: string
 *                 description: The updated name of the person giving the testimonial.
 *                 example: "Jane Doe"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The updated image file of the testimonial (upload).
 *               platform:
 *                 type: string
 *                 description: The updated platform from where the testimonial was collected.
 *                 example: "Google"
 *     responses:
 *       '200':
 *         description: Successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60f2c05396f3060015eb4d51"
 *                 rating:
 *                   type: number
 *                   example: 4
 *                 review:
 *                   type: string
 *                   example: "Improved experience with the service."
 *                 name:
 *                   type: string
 *                   example: "Jane Doe"
 *                 image:
 *                   type: string
 *                   example: "https://example.com/updated-image.jpg"
 *                 platform:
 *                   type: string
 *                   example: "Google"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-10-01T12:34:56Z"
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Validation error"
 *       '404':
 *         description: Testimonial not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Testimonial not found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */

router.put("/testimonials/:id", fileUploader("image", "testimonials"), isAdmin, updateTestimonial);



/**
 * @swagger
 * /admin/testimonial/{id}:
 *   delete:
 *     summary: Delete a specific testimonial
 *     tags: [Admin]
 *     description: Deletes a testimonial by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the testimonial to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Testimonial deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Testimonial deleted successfully"
 *       '404':
 *         description: Testimonial not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Testimonial not found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.delete("/testimonial/:id", isAdmin, deleteTestimonial);

/**
 * @swagger
 * /admin/testimonials:
 *   delete:
 *     summary: Delete all testimonials
 *     tags: [Admin]
 *     description: Deletes all testimonials from the database.
 *     responses:
 *       '200':
 *         description: All testimonials deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All testimonials deleted successfully"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.delete("/testimonials", isAdmin, deleteAllTestimonials);

export default router;
