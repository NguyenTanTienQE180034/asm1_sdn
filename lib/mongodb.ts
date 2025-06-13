import mongoose, { Mongoose } from "mongoose";

declare global {
    // eslint-disable-next-line no-var
    var mongoose:
        | {
              conn: Mongoose | null;
              promise: Promise<Mongoose> | null;
          }
        | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<Mongoose> {
    if (cached!.conn) {
        return cached!.conn;
    }

    if (!cached!.promise) {
        const opts = {
            bufferCommands: false,
            dbName: "clothing_ecommerce",
        };

        cached!.promise = mongoose
            .connect(MONGODB_URI!, opts)
            .then((mongoose) => {
                console.log(
                    "Connected to MongoDB Atlas - Database: clothing_ecommerce"
                );
                return mongoose;
            })
            .catch((err) => {
                console.error("MongoDB connection error:", err);
                throw err;
            });
    }

    cached!.conn = await cached!.promise;
    return cached!.conn;
}

export default dbConnect;
