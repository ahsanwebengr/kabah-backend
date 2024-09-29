import express from "express";
import {
  createBlog,
  updateImages,
  deleteBlog,
  deleteAllBlogs,
} from "../../controllers/admin.js/Blog.js"; 
import { createMulter } from "../../middleware/multer.js";

const router = express.Router();

/**
 * @swagger
 * paths:
 *   /admin/blogs:
 *     post:
 *       summary: Create a new travel Blog
 *       tags:
 *         - Admin
 *       description: Endpoint to create a new travel Blog
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 heading:
 *                   type: string
 *                   description: "The heading of the travel Blog"
 *                   example: "Umrah Package"
 *                     driver_picks_you_up_back_to_jeddah_airport:
 *                       type: boolean
 *                       example: true
 *       responses:
 *         '201':
 *           description: Successfully created
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60f2c05396f3060015eb4d51"
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: "Validation error"
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: "An unexpected error occurred"
 */
router.post("/blogs", createBlog);

/**
 * @swagger
 * paths:
 *   /admin/blog-media/{id}:
 *     put:
 *       summary: Update images for a specific Blog
 *       tags:
 *         - Admin
 *       description: Updates the hotel images for the Blog using multipart form data.
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the Blog to update.
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 makkah_hotel_images:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: binary
 *                   maxItems: 10
 *                 medinah_hotel_images:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: binary
 *                   maxItems: 10
 *                 # Include other fields from req.body as needed
 *       responses:
 *         '200':
 *           description: Images updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   Blog:
 *                     type: object
 *                     # Define the Blog structure according to your model
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
router.put(
  "/Blog-media/:id",
  createMulter("uploads").fields([
    { name: "makkah_hotel_images", maxCount: 10 },
    { name: "medinah_hotel_images", maxCount: 10 },
  ]),
  updateImages
);

/**
 * @swagger
 * paths:
 *   /admin/Blog/{id}:
 *     delete:
 *       summary: Delete a specific Blog
 *       tags:
 *         - Admin
 *       description: Deletes a Blog by its ID.
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the Blog to delete.
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Blog deleted successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         '404':
 *           description: Blog not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
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
router.delete("/Blog/:id", deleteBlog);

/**
 * @swagger
 * paths:
 *   /admin/Blogs:
 *     delete:
 *       summary: Delete all Blogs
 *       tags:
 *         - Admin
 *       description: Deletes all Blogs from the database.
 *       responses:
 *         '200':
 *           description: All Blogs deleted successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
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
router.delete("/Blogs", deleteAllBlogs);

export default router;
