import { Schema, model } from "mongoose";

const planSchema = Schema({
  heading: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  category: {
    type: String,
    enum: ["hajj", "umrah"],
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  flights: {
    type: Boolean,
    default: true,
    required: true,
  },
  free_ziyarahs: {
    type: Boolean,
    default: true,
    required: true,
  },
  transport: {
    type: Boolean,
    default: true,
    required: true,
  },
  sharing: {
    type: Boolean,
    default: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  hotels_rating: {
    type: String,
    enum: ["3_star", "4_star", "5_star", "2_star"],
  },
  visa_included: {
    type: Boolean,
    default: true,
    required: true,
  },
  from_date: {
    type: Date,
    required: true,
  },
  to_date: {
    type: Date,
    required: true,
  },
  departure_airport: {
    type: String,
    required: true,
  },
  transit_hub: {
    type: String,
    required: true,
  },
  price_includes: {
    visa_fee: {
      type: Boolean,
      default: true,
      required: true,
    },
    return_flight_fares: {
      type: Boolean,
      default: true,
      required: true,
    },
    days_21_hotel_accommodation: {
      type: Boolean,
      default: true,
      required: true,
    },
    all_transportation_between_makkah_medinah_airport: {
      type: Boolean,
      default: true,
      required: true,
    },
    ziyarahs_in_makkah_medinah: {
      type: Boolean,
      default: true,
      required: true,
    },
    emergency_helpline_24_7: {
      type: Boolean,
      default: true,
      required: true,
    },
    mina_services_with_ac_tents_mattress_pillow: {
      type: Boolean,
      default: true,
      required: true,
    },
    qurbani: {
      type: Boolean,
    },
  },
  price_excludes: {
    extra_meals: {
      type: Boolean,
      default: false,
      required: true,
    },
    any_private_expenses: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  complementarities: {
    flight_refreshments: {
      type: Boolean,
      default: true,
      required: true,
    },
    e_guide_Umrah_perform: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  makkah_hotel: {
    hotel_name: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      enum: ["3_star", "4_star", "5_star", "2_star"],
    },
    wheel_chair_friendly: {
      type: Boolean,
      default: true,
      required: true,
    },
    walking_from_haram_7_to_10_mints: {
      type: Boolean,
      default: true,
      required: true,
    },
    city_view: {
      type: Boolean,
      default: true,
      required: true,
    },
    air_conditioner_Rooms: {
      type: Boolean,
      default: true,
      required: true,
    },
    wifi_available: {
      type: Boolean,
      default: true,
      required: true,
    },
    breakfast_can_be_included: {
      type: Boolean,
      default: true,
      required: true,
    },
    makkah_hotel_images: {
      type: [String],
      required: true,
    },
  },
  medinah_hotel: {
    hotel_name: {
      type: String,
    },
    rating: {
      type: String,
      enum: ["3_star", "4_star", "5_star", "2_star"],
    },
    wheel_chair_friendly: {
      type: Boolean,
      default: true,
      required: true,
    },
    walking_from_haram_7_to_10_mints: {
      type: Boolean,
      default: true,
      required: true,
    },
    city_view: {
      type: Boolean,
      default: true,
      required: true,
    },
    air_conditioner_Rooms: {
      type: Boolean,
      default: true,
      required: true,
    },
    wifi_available: {
      type: Boolean,
      default: true,
      required: true,
    },
    breakfast_can_be_included: {
      type: Boolean,
      default: true,
      required: true,
    },
    medinah_hotel_images: {
      type: [String],
    },
  },

  what_to_expect: {
    fly_from_uk_to_jeddah_airport: {
      type: Boolean,
      default: true,
      required: true,
    },
    makkah_to_medinah_via_same_car: {
      type: Boolean,
      default: true,
      required: true,
    },
    driver_picks_you_from_jeddah_airport: {
      type: Boolean,
      default: true,
      required: true,
    },
    reach_medinah_hotel_check_in: {
      type: Boolean,
      default: true,
      required: true,
    },
    reach_makkah_hotel_check_in: {
      type: Boolean,
      default: true,
      required: true,
    },
    ziyarahs_in_medinah_private_car: {
      type: Boolean,
      default: true,
      required: true,
    },
    ziyarahs_in_makkah_private_car_driver: {
      type: Boolean,
      default: true,
      required: true,
    },
    driver_picks_you_up_back_to_jeddah_airport: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
});

export default model("plan", planSchema);
