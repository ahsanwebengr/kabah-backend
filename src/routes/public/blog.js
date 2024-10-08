import express from "express";
import { getBlogById, getBlogs } from "../../controllers/public/blog.js";

const router = express.Router();

/**
 * @swagger
 * paths:
 *   /public/blogs/{id}:
 *     get:
 *       summary: Retrieve a specific blog
 *       tags:
 *         - Public
 *       description: Fetches the details of a specific blog by its ID.
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the blog to retrieve.
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Blog retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   blog:
 *                     type: object
 *                     # Define the blog structure according to your model
 *         '404':
 *           description: Blog not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 */
router.get("/blogs/:id", getBlogById);

/**
 * @swagger
 * paths:
 *   /public/blogs:
 *     get:
 *       summary: Retrieve a list of blogs
 *       tags:
 *         - Public
 *       description: List of all blogs
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
 *           description: The number of blogs to retrieve per page (default is 12).
 *           schema:
 *             type: integer
 *             example: 12
 *       responses:
 *         '200':
 *           description: Blogs retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   blogs:
 *                     type: object
 *                     properties:
 *                       pages:
 *                         type: integer
 *                         description: Total number of pages available
 *                       total:
 *                         type: integer
 *                         description: Total number of blogs available
 *                       blogList:
 *                         type: array
 *                         items:
 *                           type: object
 *                           # Define the structure of individual blog objects according to your model
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
router.get("/blogs", getBlogs);

export default router;
