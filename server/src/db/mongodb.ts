import mongoose from "mongoose";

import config from "../config";

const connectDB = async () => {
  try {
    await mongoose.connect(config.db_url, {
      
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
}

export default connectDB;