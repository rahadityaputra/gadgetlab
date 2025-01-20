import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config({
  path: "../../",
});


const client = new MongoClient("mongodb://localhost:27017");

const connectMongoDB = async (req, res, next) => {
  try {
    await client.connect();
    next();
  } catch (error) {
    next(error)
  } 
}

export default { 
  connectMongoDB,
  client 
};
