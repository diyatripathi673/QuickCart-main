import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Global cache to avoid multiple connections during development
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect("${process.env.MONGO_URI}", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "QuickCart", // optional, remove if not needed
      })
      .then((mongoose) => {
        return mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
}

export default connectToDB;
