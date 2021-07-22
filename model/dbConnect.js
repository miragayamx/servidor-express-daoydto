import mongoose from "mongoose";
import logger from "../winstonConfig.js";

let mongodbClient;
let db;

export const connect = () => {
  return new Promise(async (resolve, reject) => {
    try {
      if (db) {
        resolve(db);
      } else {
        const mongodb = await mongoose.connect(
          "mongodb://127.0.0.1:27017/ecommerce",
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
          }
        );
        db = mongodb;
        resolve(db);
      }
    } catch (err) {
      logger.error(err);
      reject(err);
    }
  });
};
