import express from "express";
import {
  createBlog,
  updateImages,
  deleteBlog,
  updateBlog,
  deleteAllBlogs,
} from "../../controllers/admin.js/blog.js";
import { fileUploader } from "../../middleware/multer.js";

const router = express.Router();

/**
 * @swagger
 * /admin/blogs:
 *   post:
 *     summary: Create a new blog
 *     tags: [Admin]
 *     description: Endpoint to create a new blog.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the blog.
 *                 example: "My Travel Blog"
 *               description:
 *                 type: string
 *                 description: A brief description of the blog.
 *                 example: "This is a travel blog about my recent trip."
 *               content:
 *                 type: string
 *                 description: The full content of the blog.
 *                 example: "I visited several places and enjoyed..."
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file of the blog (upload).
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
 *                 title:
 *                   type: string
 *                   example: "My Travel Blog"
 *                 description:
 *                   type: string
 *                   example: "This is a travel blog about my recent trip."
 *                 content:
 *                   type: string
 *                   example: "I visited several places and enjoyed..."
 *                 image:
 *                   type: string
 *                   example: "https://example.com/image.jpg"
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
router.post("/blogs", fileUploader("image", "blogs"), createBlog);

/**
 * @swagger
 * /admin/blogs/{id}:
 *   put:
 *     summary: Update an existing blog
 *     tags: [Admin]
 *     description: Endpoint to update an existing blog by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog to update.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the blog.
 *                 example: "My Updated Travel Blog"
 *               description:
 *                 type: string
 *                 description: The updated brief description of the blog.
 *                 example: "This is an updated travel blog."
 *               content:
 *                 type: string
 *                 description: The updated full content of the blog.
 *                 example: "I revisited several places and..."
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The updated image file of the blog (upload).
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
 *                 title:
 *                   type: string
 *                   example: "My Updated Travel Blog"
 *                 description:
 *                   type: string
 *                   example: "This is an updated travel blog."
 *                 content:
 *                   type: string
 *                   example: "I revisited several places and..."
 *                 image:
 *                   type: string
 *                   example: "https://example.com/updated-image.jpg"
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
 *         description: Blog not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Blog not found"
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
router.put("/blogs/:id", fileUploader("image", "blogs"), updateBlog);


/**
 * @swagger
 * /admin/blog-media/{id}:
 *   put:
 *     summary: Update images for a specific blog
 *     tags: [Admin]
 *     description: Updates the blog's images using multipart form data.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the blog to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image to upload.
 *     responses:
 *       '200':
 *         description: Images updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Images updated successfully"
 *                 blog:
 *                   type: object
 *                   description: Updated blog details
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60f2c05396f3060015eb4d51"
 *                     title:
 *                       type: string
 *                       example: "My Updated Blog"
 *                     description:
 *                       type: string
 *                       example: "Updated blog description."
 *                     content:
 *                       type: string
 *                       example: "Updated blog content."
 *                     image:
 *                       type: string
 *                       example: "https://example.com/new-image.jpg"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-20T12:34:56Z"
 *       '404':
 *         description: Blog not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blog not found"
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
router.put("/blog-media/:id", updateImages);

/**
 * @swagger
 * /admin/blog/{id}:
 *   delete:
 *     summary: Delete a specific blog
 *     tags: [Admin]
 *     description: Deletes a blog by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the blog to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Blog deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blog deleted successfully"
 *       '404':
 *         description: Blog not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blog not found"
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
router.delete("/blog/:id", deleteBlog);

/**
 * @swagger
 * /admin/blogs:
 *   delete:
 *     summary: Delete all blogs
 *     tags: [Admin]
 *     description: Deletes all blogs from the database.
 *     responses:
 *       '200':
 *         description: All blogs deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All blogs deleted successfully"
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
router.delete("/blogs", deleteAllBlogs);

export default router;
