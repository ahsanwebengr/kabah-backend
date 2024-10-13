import express from "express";
import {
  getOrders,
  deleteAllOrders,
  deleteOrderById,
  getOrderById,
} from "../../controllers/admin.js/order.js"; // Adjust the path as needed
const router = express.Router();
import { isAdmin } from "../../middleware/auth.js";
/**
 * @swagger
 * paths:
 *   /admin/orders:
 *     get:
 *       summary: Retrieve a list of orders
 *       tags:
 *         - Admin
 *       description: Returns a paginated list of orders.
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
 *           description: Number of orders to retrieve per page (default is 12).
 *           required: false
 *           type: integer
 *           format: int32
 *           example: 12
 *       responses:
 *         200:
 *           description: Successfully retrieved orders
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Orders retrieved successfully."
 *               pages:
 *                 type: integer
 *                 example: 5
 *               total:
 *                 type: integer
 *                 example: 50
 *               orders:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d5ec49a3e2b15f4c9b1a0b"
 *                     full_name:
 *                       type: string
 *                       example: "Angelica Franks"
 *                     email:
 *                       type: string
 *                       example: "angelica.franks@example.com"
 *                     contact_no:
 *                       type: integer
 *                       example: 1234567890
 *                     departure_date:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-10T00:00:00.000Z"
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
router.get("/orders", isAdmin,getOrders);



/**
 * @swagger
 * paths:
 *   /admin/orders/{id}:
 *     get:
 *       summary: Retrieve a specific order by ID
 *       tags:
 *         - Admin
 *       description: Get an order by its ID.
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the order to retrieve.
 *           type: string
 *       responses:
 *         200:
 *           description: Order retrieved successfully.
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Order retrieved successfully."
 *               order:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   full_name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   contact_no:
 *                     type: integer
 *                   departure_date:
 *                     type: string
 *                     format: date-time
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *         404:
 *           description: Order not found.
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Order not found."
 */
router.get("/orders/:id",isAdmin, getOrderById);

/**
 * @swagger
 * paths:
 *   /admin/orders:
 *     delete:
 *       summary: Delete all orders
 *       tags:
 *         - Admin
 *       description: Deletes all orders in the system.
 *       responses:
 *         200:
 *           description: Successfully deleted all orders
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "All orders deleted successfully."
 *         500:
 *           description: Internal server error
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Internal Server Error"
 */
router.delete("/orders",isAdmin, deleteAllOrders);

/**
 * @swagger
 * paths:
 *   /admin/orders/{id}:
 *     delete:
 *       summary: Delete an order by ID
 *       tags:
 *         - Admin
 *       description: Deletes a specific order from the database using its ID.
 *       parameters:
 *         - name: id
 *           in: path
 *           description: The ID of the order to delete.
 *           required: true
 *           type: string
 *           example: "60d21b4667d0d8992e610c85"
 *       responses:
 *         200:
 *           description: Successfully deleted the order
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Order deleted successfully."
 *         404:
 *           description: Order not found
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Order not found."
 *         500:
 *           description: Internal server error
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Internal Server Error"
 */
router.delete("/orders/:id",isAdmin, deleteOrderById);

export default router;
