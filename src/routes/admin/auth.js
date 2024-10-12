import express from "express";
const router = express.Router();
import { isAuthorize, isAdmin } from "../../middleware/auth.js";
import {
  register,
  login,
  logOut,
} from "../../controllers/admin.js/auth.js";


/**
 * @swagger
 * paths:
 *   /admin/register:
 *     post:
 *       summary: Admin registration
 *       tags:
 *         - Admin
 *       description: Endpoint for admin registration
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: Danish
 *                   description: Admin's name
 *                 email:
 *                   type: string
 *                   example: admin@example.com
 *                   description: Admin's email
 *                 phone:
 *                   type: string
 *                   example: "1234567890"
 *                   description: Admin's phone number
 *                 password:
 *                   type: string
 *                   example: Pa$$w0rd!
 *                   description: Admin's password
 *                 repeat_password:
 *                   type: string
 *                   example: Pa$$w0rd!
 *                   description: Repeat password
 *       responses:
 *         '201':
 *           description: Admin registered successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Admin registered successfully
 *         '400':
 *           description: Validation error or user already exists
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: Email Already exists
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   errorMessage:
 *                     type: string
 *                     example: Internal Server Error
 */
router.route("/register").post(isAdmin,register);



/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin login
 *     tags:
 *       - Admin
 *     description: Endpoint for admin login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: danish.admin@example.com
 *               password:
 *                 type: string
 *                 example: Pa$$w0rd!
 *     responses:
 *       '200':
 *         description: Admin logged in successfully
 *       '400':
 *         description: Validation error or admin not found
 *       '500':
 *         description: Internal server error
 */
router.route("/login").post(login);

/**
 * @swagger
 * /admin/logOut:
 *   get:
 *     summary: Admin log out
 *     tags:
 *       - Admin
 *     description: Endpoint for logging out the admin
 *     responses:
 *       '200':
 *         description: Successfully logged out
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.route("/logOut").get(isAdmin, logOut);



export default router;
