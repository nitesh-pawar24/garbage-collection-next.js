import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";
import User from "./models/User.model.js";

dotenv.config();
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const MOBILE_NUMBER = "1111111111";

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const existing = await User.findOne({ mobile: MOBILE_NUMBER });
    if (existing) {
      console.log("A user with this mobile number already exists:", existing);
      process.exit(0);
    }

    const superAdmin = await User.create({
      name: "Super Admin",
      mobile: MOBILE_NUMBER,
      role: "COMPANY_ADMIN",
      isActive: true,
    });

    console.log("Super Admin created successfully:");
    console.log(superAdmin);
    process.exit(0);
  } catch (err) {
    console.error("Error creating Super Admin:", err);
    process.exit(1);
  }
};

run();