import express from "express";
import {
  getTestimonial,
  getTestimonials,
} from "../../controllers/public/testimonial.js";

const router = express.Router();

/**
 * @swagger
 * paths:
 *   /public/testimonials/{id}:
 *     get:
 *       summary: Retrieve a specific testimonial
 *       tags:
 *         - Public
 *       description: Fetches the details of a specific testimonial by its ID.
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the testimonial to retrieve.
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Testimonial retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   testimonial:
 *                     type: object
 *                     # Define the testimonial structure according to your model
 *         '404':
 *           description: Testimonial not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 */
router.get("/testimonials/:id", getTestimonial);

/**
 * @swagger
 * paths:
 *   /public/testimonials:
 *     get:
 *       summary: Retrieve a list of testimonials
 *       tags:
 *         - Public
 *       description: List of all testimonials
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
 *           description: The number of testimonials to retrieve per page (default is 12).
 *           schema:
 *             type: integer
 *             example: 12
 *       responses:
 *         '200':
 *           description: Testimonials retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   testimonials:
 *                     type: object
 *                     properties:
 *                       pages:
 *                         type: integer
 *                         description: Total number of pages available
 *                       total:
 *                         type: integer
 *                         description: Total number of testimonials available
 *                       blogList:
 *                         type: array
 *                         items:
 *                           type: object
 *                           # Define the structure of individual testimonial objects according to your model
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 */
router.get("/testimonials", getTestimonials);

export default router;
