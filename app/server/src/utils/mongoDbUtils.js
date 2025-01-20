import mongodb from "../configuration/mongodb.js";
import { ResponseError } from "../error/response-error.js";

const findPopularDevicesData = async () => {
    const database = mongodb.client.db("gadgetlab_database");
    const collection = database.collection("topDevices");
    try {
        const topDeviceByFans = await collection
          .find({
            category: "Top 10 by fans",
          })
          .toArray();
      
        const topDeviceByDayInterest = await collection
          .find({
            category: "Top 10 by daily interest",
          })
          .toArray();
      
        if (topDeviceByFans.length === 0 && topDeviceByFans.length === 0) {
            return null;
        }
        
        return [...topDeviceByDayInterest, ...topDeviceByFans];
    } catch (error) {
        throw new ResponseError(500, error.message);
    }
  };
  
 const saveData = async (data, collectionName) => {
  
    const database = mongodb.client.db("gadgetlab_database");
    const collection = database.collection(collectionName);
  
    try {
      let result;
      if (Array.isArray(data)) {
        result = await collection.insertMany(data);
        return {
          success: result.acknowledged,
          insertedCount: result.insertedCount,
          insertedIds: result.insertedIds,
        };
      } else {
        result = await collection.insertOne(data);
        return {
          success: result.acknowledged,
          insertedId: result.insertedId,
        };
      }
    } catch (error) {
      throw new ResponseError(500, error.message);
    }
  };

const findDetailDevice = async (id) => {
    const database = mongodb.client.db("gadgetlab_database");
    const collection = database.collection("devices");
    try {
        const detailDevice = await collection
          .findOne({
            id : id,
          });
        
          return detailDevice;
    } catch (error) {
        throw new ResponseError(500, error.message);
    }
}


const findDevicesContaintName = async (name, limit) => {
  const database = mongodb.client.db("gadgetlab_database");
  const collection = database.collection("search_devices");
  
  try {
    const result = await collection.find({
      name : new RegExp(name, "i")
    }).limit(limit).toArray();

    return result;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }

}


const saveWithBulkwrite = async (operations) => {
  const database = mongodb.client.db("gadgetlab_database")
  const collection = database.collection("search_devices");
  try {
    const results = await collection.bulkWrite(operations);
    return results;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
}


const findVerificationCode = async (code, userId) => {
  const database = mongodb.client.db("gadgetlab_database")
  const collection = database.collection("otp_codes");
  try {
    const result = await collection.findOneAndDelete({
      code,
      userId
    });

    return result;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
  
}

  export default {
    findPopularDevicesData,
    saveData,
    findDetailDevice,
    findDevicesContaintName,
    findVerificationCode,
    saveWithBulkwrite,
  }