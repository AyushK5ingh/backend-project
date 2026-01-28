import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    console.log("MONGODB_URI:", process.env.MONGODB_URI);
    console.log("DB_NAME:", DB_NAME);

    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: DB_NAME,
    });
    console.log(
      `Database connected successfully ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
    // throw error;
  }
};

export default connectDB;
