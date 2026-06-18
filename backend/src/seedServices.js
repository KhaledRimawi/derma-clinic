require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Service = require("./models/Service");

const services = [
  {
    name: "Initial Online Consultation",
    slug: "initial-online-consultation",
    description:
      "Initial online dermatology consultation for skin assessment and treatment planning.",
    durationMinutes: 30,
    price: 50,
    currency: "EUR",
    category: "patient",
  },
  {
    name: "Follow-up Consultation",
    slug: "follow-up-consultation",
    description:
      "Follow-up appointment to review progress, treatment response, and next steps.",
    durationMinutes: 15,
    price: 30,
    currency: "EUR",
    category: "patient",
  },
  {
    name: "Online Skin Assessment",
    slug: "online-skin-assessment",
    description:
      "Photo-based online skin assessment for non-urgent dermatology concerns.",
    durationMinutes: 30,
    price: 45,
    currency: "EUR",
    category: "patient",
  },
  {
    name: "Acne Consultation",
    slug: "acne-consultation",
    description:
      "Consultation for acne evaluation, triggers, skincare routine review, and treatment planning.",
    durationMinutes: 30,
    price: 50,
    currency: "EUR",
    category: "patient",
  },
  {
    name: "Rosacea Consultation",
    slug: "rosacea-consultation",
    description:
      "Online consultation for rosacea, facial redness, flushing, and sensitive skin management.",
    durationMinutes: 30,
    price: 50,
    currency: "EUR",
    category: "patient",
  },
  {
    name: "Pigmentation Consultation",
    slug: "pigmentation-consultation",
    description:
      "Consultation for melasma, dark spots, post-inflammatory pigmentation, and uneven skin tone.",
    durationMinutes: 30,
    price: 50,
    currency: "EUR",
    category: "patient",
  },
  {
    name: "Hair Loss Consultation",
    slug: "hair-loss-consultation",
    description:
      "Online dermatology consultation for hair shedding, thinning, and scalp-related concerns.",
    durationMinutes: 30,
    price: 50,
    currency: "EUR",
    category: "patient",
  },
  {
    name: "Eczema Consultation",
    slug: "eczema-consultation",
    description:
      "Consultation for eczema, dry skin, itching, irritation, and long-term skin barrier care.",
    durationMinutes: 30,
    price: 50,
    currency: "EUR",
    category: "patient",
  },
  {
    name: "Skincare Routine Review",
    slug: "skincare-routine-review",
    description:
      "Review of current skincare products and routine with medical guidance for safer skin care.",
    durationMinutes: 30,
    price: 40,
    currency: "EUR",
    category: "patient",
  },
  {
    name: "Cosmetic Dermatology Consultation",
    slug: "cosmetic-dermatology-consultation",
    description:
      "Consultation about cosmetic dermatology options, expectations, safety, and treatment planning.",
    durationMinutes: 30,
    price: 60,
    currency: "EUR",
    category: "patient",
  },
  {
    name: "Anti-aging Consultation",
    slug: "anti-aging-consultation",
    description:
      "Consultation for anti-aging skincare, prevention, treatment options, and long-term skin health.",
    durationMinutes: 30,
    price: 60,
    currency: "EUR",
    category: "patient",
  },
];

const seedServices = async () => {
  try {
    await connectDB();
    await Service.deleteMany({});

    const insertedServices = await Service.insertMany(services);

    console.log(
      `Services seeded successfully: ${insertedServices.length} inserted.`
    );
  } catch (error) {
    console.error(`Failed to seed services: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seedServices();
