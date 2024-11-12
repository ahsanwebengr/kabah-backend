import Joi from 'joi';


const adminRegisterValidation = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email Address is required",
      "string.email": "Email Address must be a valid email",
    }),
  password: Joi.string().min(6).max(30).required().messages({
    "string.min": "Password must be at least {#limit} characters long.",
    "string.max": "Password must be no more than {#limit} characters long.",
    "string.empty": "Password cannot be an empty field.",
    "any.required": "Password is required.",
  }),
  repeat_password: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords must match",
    "any.required": "Repeat password is required.",
  }),
  phone: Joi.string().required().messages({
    "string.empty": "Phone Number is required",
  }),
  isDelete: Joi.boolean().optional(),
  // Additional fields can be added here if needed
});

const loginValidation = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .messages({
      "string.email": "Email must be a valid email address.",
      "string.empty": "Email cannot be an empty field.",
    }),
  password: Joi.string().min(3).max(30).required().messages({
    "string.min": "Password must be at least {#limit} characters long.",
    "string.max": "Password must be no more than {#limit} characters long.",
    "string.empty": "Password cannot be an empty field.",
    "any.required": "Password is required.",
  }),
});
// Plan verification schema
const planVerificationSchema = Joi.object({
  visa_fee: Joi.boolean().default(true),
  return_flight_fares: Joi.boolean().default(true),
  days_21_hotel_accommodation: Joi.boolean().default(true),
  all_transportation_between_makkah_medinah_airport: Joi.boolean().default(true),
  ziyarahs_in_makkah_medinah: Joi.boolean().default(true),
  emergency_helpline_24_7: Joi.boolean().default(true),
  mina_services_with_ac_tents_mattress_pillow: Joi.boolean().default(true),
  qurbani: Joi.boolean().default(true),
}).required(); // Ensure the whole object is required

// Price excludes schema
const priceExcludesSchema = Joi.object({
  extra_meals: Joi.boolean().default(false),
  any_private_expenses: Joi.boolean().default(false),
});

// Complementarities schema
const complementaritiesSchema = Joi.object({
  flight_refreshments: Joi.boolean().default(true),
  e_guide_Umrah_perform: Joi.boolean().default(true),
});

// Hotel schema
const hotelSchema = Joi.object({
  name: Joi.string().required(),
  rating: Joi.string().valid('3_star', '4_star', '5_star').optional(),
  wheel_chair_friendly: Joi.boolean().default(true),
  walking_from_haram_7_to_10_mints: Joi.boolean().default(true),
  city_view: Joi.boolean().default(true),
  air_conditioner_rooms: Joi.boolean().default(true), // Corrected to use lowercase
  wifi_available: Joi.boolean().default(true),
  breakfast_can_be_included: Joi.boolean().default(true),
  makkah_hotel_images: Joi.array().items(Joi.string()).required(),
  medinah_hotel_images: Joi.array().items(Joi.string()).optional(),
});

// What to expect schema
const whatToExpectSchema = Joi.object({
  fly_from_uk_to_jeddah_airport: Joi.boolean().default(true),
  makkah_to_medinah_via_same_car: Joi.boolean().default(true),
  driver_picks_you_from_jeddah_airport: Joi.boolean().default(true),
  reach_medinah_hotel_check_in: Joi.boolean().default(true),
  reach_makkah_hotel_check_in: Joi.boolean().default(true),
  ziyarahs_in_medinah_private_car: Joi.boolean().default(true),
  ziyarahs_in_makkah_private_car_driver: Joi.boolean().default(true),
  driver_picks_you_up_back_to_jeddah_airport: Joi.boolean().default(true),
});

// Main plan validation schema
const planValidationSchema = Joi.object({
  heading: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  duration: Joi.number().required(),
  hotels_rating: Joi.string().valid('3_star', '4_star', '5_star').optional(),
  visa_included: Joi.boolean().default(true).required(),
  from_date: Joi.date().required(),
  to_date: Joi.date().required(),
  departure_airport: Joi.string().required(),
  transit_hub: Joi.string().required(),
  price_includes: planVerificationSchema.required(), // Updated to use the correct schema
  price_excludes: priceExcludesSchema.required(),
  complementarities: complementaritiesSchema.required(),
  makkah_hotel: hotelSchema.required(),
  medinah_hotel: hotelSchema.optional(),
  what_to_expect: whatToExpectSchema.required(),
});

const contact_form_validationSchema = Joi.object({
  departure_airport: Joi.string().messages({
    'string.base': '"Departure airport" should be a type of string',
  }),

  hotel_category: Joi.string().valid('3_star', '4_star', '5_star', '2_star').messages({
    'string.base': '"Hotel category" should be a type of string',
    'any.only': '"Hotel category" must be one of [3_star", "4_star", "5_star", "2_star"]',
  }),

  departure_date: Joi.date().iso().messages({
    'date.base': '"Departure date" should be a valid date',
  }),

  arrival_date: Joi.date().iso().messages({
    'date.base': '"Arrival date" should be a valid date',
  }),

  nights_in_makkah: Joi.number().integer().positive().messages({
    'number.base': '"Nights in Makkah" should be a number',
    'number.integer': '"Nights in Makkah" must be an integer',
    'number.positive': '"Nights in Makkah" must be a positive number',
  }),

  nights_in_madinah: Joi.number().integer().positive().messages({
    'number.base': '"Nights in Madinah" should be a number',
    'number.integer': '"Nights in Madinah" must be an integer',
    'number.positive': '"Nights in Madinah" must be a positive number',
  }),

  number_of_passengers: Joi.number().integer().positive().messages({
    'number.base': '"Number of passengers" should be a number',
    'number.integer': '"Number of passengers" must be an integer',
    'number.positive': '"Number of passengers" must be a positive number',
  }),

  children: Joi.number().integer().min(0).messages({
    'number.base': '"Children" should be a number',
    'number.integer': '"Children" must be an integer',
    'number.min': '"Children" cannot be negative',
  }),

  full_name: Joi.string().messages({
    'string.base': '"Full name" should be a type of string',
  }),

  contact_no: Joi.number().integer().positive().messages({
    'number.base': '"Contact number" should be a number',
    'number.integer': '"Contact number" must be an integer',
    'number.positive': '"Contact number" must be a positive number',
  }),

  email: Joi.string().email().messages({
    'string.base': '"Email" should be a type of string',
    'string.email': '"Email" must be a valid email',
  }),

  subject: Joi.string().messages({
    'string.base': '"Subject" should be a type of string',
  }),

  status: Joi.string().valid('pending', 'complete').messages({
    'string.base': '"Status" should be a type of string',
    'any.only': '"Status" must be one of [pending, complete]',
  }),

  type: Joi.string().valid('price quote', 'contact').messages({
    'string.base': '"Type" should be a type of string',
    'any.only': '"Type" must be one of [price quote, contact]',
  }),

  your_message: Joi.string().messages({
    'string.base': '"Your message" should be a type of string',
  }),
}).unknown({
  allowUnknown: true,
});

const blog_form_validationSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.base': '"title" should be a type of string',
    'any.required': '"title" is a required field',
  }),
  description: Joi.string().required().messages({
    'string.base': '"description" should be a type of string',
    'any.required': '"description" is a required field',
  }),
  content: Joi.string().required().messages({
    'string.base': '"content" should be a type of string',
    'any.required': '"content" is a required field',
  }),
});

const order_validationSchema = Joi.object({
  full_name: Joi.string().required(),

  email: Joi.string().email().required(),

  contact_no: Joi.number().required(),

  departure_date: Joi.date().required(),

  children: Joi.number().integer().required(),

  adults: Joi.number().integer().required(),
  additional_info: Joi.string().optional(),
});

const flightsValidationSchema = Joi.object({
  from: Joi.string().required().messages({
    "string.base": `"from" should be a type of 'text'`,
    "string.empty": `"from" cannot be an empty field`,
    "any.required": `"from" is a required field`,
  }),

  to: Joi.string().required().messages({
    "string.base": `"to" should be a type of 'text'`,
    "string.empty": `"to" cannot be an empty field`,
    "any.required": `"to" is a required field`,
  }),
  airline: Joi.string().required().messages({
    "string.base": `"airline" should be a type of 'text'`,
    "string.empty": `"airline" cannot be an empty field`,
    "any.required": `"airline" is a required field`,
  }),
  price: Joi.number().positive().required().messages({
    "number.base": `"price" should be a type of 'number'`,
    "number.positive": `"price" must be a positive number`,
    "any.required": `"price" is a required field`,
  }),

  flightsNumber: Joi.number().integer().positive().required().messages({
    "number.base": `"flightsNumber" should be a type of 'number'`,
    "number.integer": `"flightsNumber" must be an integer`,
    "number.positive": `"flightsNumber" must be a positive number`,
    "any.required": `"flightsNumber" is a required field`,
  }),
});



export {
  adminRegisterValidation,
  loginValidation,
  planVerificationSchema,
  order_validationSchema,
  contact_form_validationSchema,
  blog_form_validationSchema,
  flightsValidationSchema,
};
