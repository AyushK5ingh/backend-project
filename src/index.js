// require("dotenv").config(path: `./.env`);
import "dotenv/config";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
import app from "./app.js";


connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`⚙️  Server is running on port ${process.env.PORT} ⚙️`);
    });
    app.on("error", (error) => {
      console.error("Error connecting to the 1 database:", error);
      throw error;
    });
  })
  .catch((err) => {
    console.error("Error connecting to the 01ndatabase:", err);
    process.exit(1);
  });

/*
this code is unproffesinal


import express from "express";
const app = express();

(async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error) => {
            console.error("Error connecting to the database:", error);
            throw error;
        })
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    }
    catch (error) {
        console.error("Error connecting to the database:", error);
        throw error;
    }

})();

*/