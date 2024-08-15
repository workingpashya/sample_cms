import mongoose from "mongoose";
const { DB_PORT, DB_HOST, DB_NAME } = process.env;

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(
      `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`
    );
    console.log(`Database connected : ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
  }
};

export { connectDB };
