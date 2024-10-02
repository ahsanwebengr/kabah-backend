import express from "express";
import {
  createPlan,
  updateImages,
  updatePlan,
  deletePlan,
  deleteAllPlans,
} from "../../controllers/admin.js/plan.js"; // Fixed import path
import { createMulter } from "../../middleware/multer.js";
const router = express.Router();

/**
 * @swagger
 * paths:
 *   /admin/plans:
 *     post:
 *       summary: Create a new travel plan
 *       tags:
 *         - Admin
 *       description: Endpoint to create a new travel plan
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 heading:
 *                   type: string
 *                   description: "The heading of the travel plan"
 *                   example: "Umrah Package"
 *                 price:
 *                   type: number
 *                   description: "The price of the travel plan"
 *                   example: 120.00
 *                 thumbnail:
 *                   type: string
 *                   description: "Thumbnail image URL"
 *                   example: "http://example.com/image.jpg"
 *                 category:
 *                   type: string
 *                   enum: ["hajj", "umrah"]
 *                   description: "Select the category: umrah or hajj"
 *                   example: "hajj"
 *                 flights:
 *                   type: boolean
 *                   description: "Whether flights are included"
 *                   example: true
 *                 free_ziyarahs:
 *                   type: boolean
 *                   description: "free_ziyarahs are included"
 *                   example: true
 *                 transport:
 *                   type: boolean
 *                   description: "Whether transport is included"
 *                   example: true
 *                 sharing:
 *                   type: boolean
 *                   description: "Whether sharing options are included"
 *                   example: true
 *                 description:
 *                   type: string
 *                   description: "Detailed description of the travel plan"
 *                   example: "A comprehensive Umrah package with all amenities."
 *                 duration:
 *                   type: number
 *                   description: "Duration of the travel plan in days"
 *                   example: 14
 *                 hotels_rating:
 *                   type: string
 *                   enum: ["3_star", "4_star", "5_star","economy"]
 *                   description: "Hotel star rating"
 *                   example: "5_star"
 *                 visa_included:
 *                   type: boolean
 *                   description: "Whether the visa is included"
 *                   example: true
 *                 from_date:
 *                   type: string
 *                   format: date
 *                   description: "Starting date of the travel"
 *                   example: "2023-10-01"
 *                 to_date:
 *                   type: string
 *                   format: date
 *                   description: "Ending date of the travel"
 *                   example: "2023-10-15"
 *                 departure_airport:
 *                   type: string
 *                   description: "Departure airport name"
 *                   example: "London Heathrow"
 *                 transit_hub:
 *                   type: string
 *                   description: "Transit hub location"
 *                   example: "Jeddah"
 *                 price_includes:
 *                   type: object
 *                   description: "Details of what is included in the price"
 *                   properties:
 *                     visa_fee:
 *                       type: boolean
 *                       example: true
 *                     return_flight_fares:
 *                       type: boolean
 *                       example: true
 *                     days_21_hotel_accommodation:
 *                       type: boolean
 *                       example: true
 *                     all_transportation_between_makkah_medinah_airport:
 *                       type: boolean
 *                       example: true
 *                     ziyarahs_in_makkah_medinah:
 *                       type: boolean
 *                       example: true
 *                     emergency_helpline_24_7:
 *                       type: boolean
 *                       example: true
 *                     mina_services_with_ac_tents_mattress_pillow:
 *                       type: boolean
 *                       example: true
 *                     qurbani:
 *                       type: boolean
 *                       example: true
 *                 price_excludes:
 *                   type: object
 *                   description: "Details of what is excluded from the price"
 *                   properties:
 *                     extra_meals:
 *                       type: boolean
 *                       example: false
 *                     any_private_expenses:
 *                       type: boolean
 *                       example: false
 *                 complementarities:
 *                   type: object
 *                   description: "Additional services included"
 *                   properties:
 *                     flight_refreshments:
 *                       type: boolean
 *                       example: true
 *                     e_guide_Umrah_perform:
 *                       type: boolean
 *                       example: true
 *                 makkah_hotel:
 *                   type: object
 *                   description: "Details of the Makkah hotel"
 *                   properties:
 *                     hotel_name:
 *                       type: string
 *                       example: "Hotel Makkah"
 *                     rating:
 *                       type: string
 *                       enum: ["3_star", "4_star", "5_star","economy"]
 *                       description: "Hotel star rating"
 *                     wheel_chair_friendly:
 *                       type: boolean
 *                       example: true
 *                     walking_from_haram_7_to_10_mins:
 *                       type: boolean
 *                       example: true
 *                     city_view:
 *                       type: boolean
 *                       example: true
 *                     air_conditioner_Rooms:
 *                       type: boolean
 *                       example: true
 *                     wifi_available:
 *                       type: boolean
 *                       example: true
 *                     breakfast_can_be_included:
 *                       type: boolean
 *                       example: true
 *                     makkah_hotel_images:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["image1.jpg", "image2.jpg"]
 *                 medinah_hotel:
 *                   type: object
 *                   description: "Details of the Medinah hotel"
 *                   properties:
 *                     hotel_name:
 *                       type: string
 *                       example: "Hotel Medinah"
 *                     rating:
 *                       type: string
 *                       enum: ["3_star", "4_star", "5_star","economy"]
 *                       description: "Hotel star rating"
 *                     wheel_chair_friendly:
 *                       type: boolean
 *                       example: true
 *                     walking_from_haram_7_to_10_mins:
 *                       type: boolean
 *                       example: true
 *                     city_view:
 *                       type: boolean
 *                       example: true
 *                     air_conditioner_Rooms:
 *                       type: boolean
 *                       example: true
 *                     wifi_available:
 *                       type: boolean
 *                       example: true
 *                     breakfast_can_be_included:
 *                       type: boolean
 *                       example: true
 *                     medinah_hotel_images:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["image1.jpg", "image2.jpg"]
 *                 what_to_expect:
 *                   type: object
 *                   description: "Details on what to expect during the trip"
 *                   properties:
 *                     fly_from_uk_to_jeddah_airport:
 *                       type: boolean
 *                       example: true
 *                     makkah_to_medinah_via_same_car:
 *                       type: boolean
 *                       example: true
 *                     driver_picks_you_from_jeddah_airport:
 *                       type: boolean
 *                       example: true
 *                     reach_medinah_hotel_check_in:
 *                       type: boolean
 *                       example: true
 *                     reach_makkah_hotel_check_in:
 *                       type: boolean
 *                       example: true
 *                     ziyarahs_in_medinah_private_car:
 *                       type: boolean
 *                       example: true
 *                     ziyarahs_in_makkah_private_car_driver:
 *                       type: boolean
 *                       example: true
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

router.post("/plans", createPlan);

/**
 * @swagger
 * paths:
 *   /admin/plans-media/{id}:
 *     put:
 *       summary: Update images for a specific plan
 *       tags:
 *         - Admin
 *       description: Updates images for the specified plan using multipart form data.
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the plan to update.
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 thumbnail:
 *                   type: string
 *                   format: binary
 *                   description: The image to upload for the plan
 *                 makkah_hotel_images:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: binary
 *                   description: The images for Makkah hotel
 *                 medinah_hotel_images:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: binary
 *                   description: The images for Medinah hotel
 *       responses:
 *         '200':
 *           description: Image updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Image updated successfully"
 *                   plan:
 *                     type: object
 *                     description: The updated plan object
 *         '404':
 *           description: Plan not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Plan not found"
 */

router.put(
  "/plans-media/:id",
  createMulter("uploads").fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "makkah_hotel_images", maxCount: 10 },
    { name: "medinah_hotel_images", maxCount: 10 },
  ]),
  updateImages
);

/**
 * @swagger
 * paths:
 *   /admin/plans/{id}:
 *     put:
 *       summary: Update a specific plan
 *       tags:
 *         - Admin
 *       description: Updates specific plan
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the plan to update.
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 heading:
 *                   type: string
 *                   description: "The heading of the travel plan"
 *                   example: "Umrah Package"
 *                 price:
 *                   type: number
 *                   description: "The price of the travel plan"
 *                   example: 120.00
 *                 thumbnail:
 *                   type: string
 *                   description: "Thumbnail image URL"
 *                   example: "http://example.com/image.jpg"
 *                 category:
 *                   type: string
 *                   enum: ["hajj", "umrah"]
 *                   description: "Select the category: umrah or hajj"
 *                   example: "hajj"
 *                 flights:
 *                   type: boolean
 *                   description: "Whether flights are included"
 *                   example: true
 *                 free_ziyarahs:
 *                   type: boolean
 *                   description: "free_ziyarahs are included"
 *                   example: true
 *                 transport:
 *                   type: boolean
 *                   description: "Whether transport is included"
 *                   example: true
 *                 sharing:
 *                   type: boolean
 *                   description: "Whether sharing options are included"
 *                   example: true
 *                 description:
 *                   type: string
 *                   description: "Detailed description of the travel plan"
 *                   example: "A comprehensive Umrah package with all amenities."
 *                 duration:
 *                   type: number
 *                   description: "Duration of the travel plan in days"
 *                   example: 14
 *                 hotels_rating:
 *                   type: string
 *                   enum: ["3_star", "4_star", "5_star","economy"]
 *                   description: "Hotel star rating"
 *                   example: "5_star"
 *                 visa_included:
 *                   type: boolean
 *                   description: "Whether the visa is included"
 *                   example: true
 *                 from_date:
 *                   type: string
 *                   format: date
 *                   description: "Starting date of the travel"
 *                   example: "2023-10-01"
 *                 to_date:
 *                   type: string
 *                   format: date
 *                   description: "Ending date of the travel"
 *                   example: "2023-10-15"
 *                 departure_airport:
 *                   type: string
 *                   description: "Departure airport name"
 *                   example: "London Heathrow"
 *                 transit_hub:
 *                   type: string
 *                   description: "Transit hub location"
 *                   example: "Jeddah"
 *                 price_includes:
 *                   type: object
 *                   description: "Details of what is included in the price"
 *                   properties:
 *                     visa_fee:
 *                       type: boolean
 *                       example: true
 *                     return_flight_fares:
 *                       type: boolean
 *                       example: true
 *                     days_21_hotel_accommodation:
 *                       type: boolean
 *                       example: true
 *                     all_transportation_between_makkah_medinah_airport:
 *                       type: boolean
 *                       example: true
 *                     ziyarahs_in_makkah_medinah:
 *                       type: boolean
 *                       example: true
 *                     emergency_helpline_24_7:
 *                       type: boolean
 *                       example: true
 *                     mina_services_with_ac_tents_mattress_pillow:
 *                       type: boolean
 *                       example: true
 *                     qurbani:
 *                       type: boolean
 *                       example: true
 *                 price_excludes:
 *                   type: object
 *                   description: "Details of what is excluded from the price"
 *                   properties:
 *                     extra_meals:
 *                       type: boolean
 *                       example: false
 *                     any_private_expenses:
 *                       type: boolean
 *                       example: false
 *                 complementarities:
 *                   type: object
 *                   description: "Additional services included"
 *                   properties:
 *                     flight_refreshments:
 *                       type: boolean
 *                       example: true
 *                     e_guide_Umrah_perform:
 *                       type: boolean
 *                       example: true
 *                 makkah_hotel:
 *                   type: object
 *                   description: "Details of the Makkah hotel"
 *                   properties:
 *                     hotel_name:
 *                       type: string
 *                       example: "Hotel Makkah"
 *                     rating:
 *                       type: string
 *                       enum: ["3_star", "4_star", "5_star","economy"]
 *                       description: "Hotel star rating"
 *                     wheel_chair_friendly:
 *                       type: boolean
 *                       example: true
 *                     walking_from_haram_7_to_10_mins:
 *                       type: boolean
 *                       example: true
 *                     city_view:
 *                       type: boolean
 *                       example: true
 *                     air_conditioner_Rooms:
 *                       type: boolean
 *                       example: true
 *                     wifi_available:
 *                       type: boolean
 *                       example: true
 *                     breakfast_can_be_included:
 *                       type: boolean
 *                       example: true
 *                     makkah_hotel_images:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["image1.jpg", "image2.jpg"]
 *                 medinah_hotel:
 *                   type: object
 *                   description: "Details of the Medinah hotel"
 *                   properties:
 *                     hotel_name:
 *                       type: string
 *                       example: "Hotel Medinah"
 *                     rating:
 *                       type: string
 *                       enum: ["3_star", "4_star", "5_star","economy"]
 *                       description: "Hotel star rating"
 *                     wheel_chair_friendly:
 *                       type: boolean
 *                       example: true
 *                     walking_from_haram_7_to_10_mins:
 *                       type: boolean
 *                       example: true
 *                     city_view:
 *                       type: boolean
 *                       example: true
 *                     air_conditioner_Rooms:
 *                       type: boolean
 *                       example: true
 *                     wifi_available:
 *                       type: boolean
 *                       example: true
 *                     breakfast_can_be_included:
 *                       type: boolean
 *                       example: true
 *                     medinah_hotel_images:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["image1.jpg", "image2.jpg"]
 *                 what_to_expect:
 *                   type: object
 *                   description: "Details on what to expect during the trip"
 *                   properties:
 *                     fly_from_uk_to_jeddah_airport:
 *                       type: boolean
 *                       example: true
 *                     makkah_to_medinah_via_same_car:
 *                       type: boolean
 *                       example: true
 *                     driver_picks_you_from_jeddah_airport:
 *                       type: boolean
 *                       example: true
 *                     reach_medinah_hotel_check_in:
 *                       type: boolean
 *                       example: true
 *                     reach_makkah_hotel_check_in:
 *                       type: boolean
 *                       example: true
 *                     ziyarahs_in_medinah_private_car:
 *                       type: boolean
 *                       example: true
 *                     ziyarahs_in_makkah_private_car_driver:
 *                       type: boolean
 *                       example: true
 *                     driver_picks_you_up_back_to_jeddah_airport:
 *                       type: boolean
 *                       example: true
 *       responses:
 *         '200':
 *           description: Plan updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Plan updated successfully"
 *                   plan:
 *                     type: object
 *                     description: "The updated plan object"
 *         '404':
 *           description: Plan not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Plan not found"
 */
router.put("/plans/:id", updatePlan);

/**
 * @swagger
 * paths:
 *   /admin/plans/{id}:
 *     delete:
 *       summary: Delete a specific plan
 *       tags:
 *         - Admin
 *       description: Deletes a plan by its ID.
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the plan to delete.
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Plan deleted successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         '404':
 *           description: Plan not found
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
router.delete("/plans/:id", deletePlan);

/**
 * @swagger
 * paths:
 *   /admin/plans:
 *     delete:
 *       summary: Delete all plans
 *       tags:
 *         - Admin
 *       description: Deletes all plans from the database.
 *       responses:
 *         '200':
 *           description: All plans deleted successfully
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
router.delete("/plans", deleteAllPlans);

export default router;
