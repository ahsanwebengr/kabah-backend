import express from "express";
import { getPlan, getPlans } from "../../controllers/public/plan.js";

const router = express.Router();

/**
 * @swagger
 * paths:
 *   /public/plans/{id}:
 *     get:
 *       summary: Retrieve a specific plan
 *       tags:
 *         - Public
 *       description: Fetches the details of a specific plan by its ID.
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the plan to retrieve.
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Plan retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   plan:
 *                     type: object
 *                     # Define the plan structure according to your model
 *         '404':
 *           description: Plan not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 */
router.get("/plans/:id", getPlan);

/**
 * @swagger
 * paths:
 *   /public/plans:
 *     get:
 *       summary: Retrieve a list of plans
 *       tags:
 *         - Public
 *       description: Fetches a paginated list of plans with optional filtering by category, and pagination parameters for limit and page number.
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
 *           description: The number of plans to retrieve per page (default is 12).
 *           schema:
 *             type: integer
 *             example: 12
 *         - name: category
 *           in: query
 *           required: false
 *           description:  plans by category hajj , ramzan or umrah.
 *           schema:
 *             type: string
 *             example: "umrah"
 *         - name: hotels_rating
 *           in: query
 *           required: false
 *           description:  plans by hotels_rating "3_star", "4_star", "5_star", "2_star".
 *           schema:
 *             type: string
 *             example: "3_star"
 *       responses:
 *         '200':
 *           description: Plans retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   plan:
 *                     type: object
 *                     properties:
 *                       pages:
 *                         type: integer
 *                         description: Total number of pages available
 *                       total:
 *                         type: integer
 *                         description: Total number of plans available
 *                       plans:
 *                         type: array
 *                         items:
 *                           type: object
 *                           # Define the structure of the individual plan object according to your model
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
router.get("/plans", getPlans);

export default router;
