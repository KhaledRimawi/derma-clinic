require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/User");

const seedAdmin = async () => {
  try {
    const {
      ADMIN_FIRST_NAME,
      ADMIN_LAST_NAME,
      ADMIN_EMAIL,
      ADMIN_PASSWORD,
    } = process.env;

    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      throw new Error(
        "ADMIN_EMAIL and ADMIN_PASSWORD must be set in the environment"
      );
    }

    await connectDB();

    const normalizedEmail = ADMIN_EMAIL.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      if (existingUser.role === "admin") {
        console.log("Admin user already exists.");
      } else {
        console.log(
          "A patient user already exists with the admin email. No changes were made."
        );
      }

      return;
    }

    await User.create({
      firstName: ADMIN_FIRST_NAME || "Doctor",
      lastName: ADMIN_LAST_NAME || "Admin",
      email: normalizedEmail,
      password: ADMIN_PASSWORD,
      role: "admin",
    });

    console.log("Admin user created successfully.");
  } catch (error) {
    console.error(`Failed to seed admin: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seedAdmin();
