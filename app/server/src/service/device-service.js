import gsmarena from "gsmarena-api";
import { ResponseError } from "../error/response-error.js";
import mongoDbUtils from "../utils/mongoDbUtils.js";
import pdfUtils from "../utils/pdfUtils.js";
import { prisma } from "../configuration/prisma.js";

const fetchAllPopularDevices = async () => {
  try {
    let topDevices = await mongoDbUtils.findPopularDevicesData();

    if (!topDevices) {
      console.log("belum ada di db");
      const tops = await gsmarena.top.get();
      const results = tops.map((top) => {
        return top.list.map((device) => {
          device.category = top.category;
          return device;
        });
      });

      const [
        topDeviceByDayInterest = { list: [] },
        topDeviceByFans = { list: [] },
      ] = results;

      topDevices = [...topDeviceByDayInterest, ...topDeviceByFans];

      await mongoDbUtils.saveData(topDevices, "topDevices");
    }

    return topDevices;
  } catch (error) {
    throw new ResponseError(error.status, error.message);
  }
};

const fetchDetailDevice = async (id) => {
  let device;
  try {
    device = await mongoDbUtils.findDetailDevice(id);

    if (!device) {
      device = await gsmarena.catalog.getDevice(id);
      device.id = id;
      await mongoDbUtils.saveData(device, "devices");
      return device;
    }

    return device;
  } catch (error) {
    throw new ResponseError(error.status, error.message);
  }
};

const createFilePdfDetailDevice = async (id) => {
  let device;
  try {
    device = await fetchDetailDevice(id);
    const pdf = await pdfUtils.createPdf(device);

    if (!pdf || typeof pdf.pipe !== "function") {
      throw new Error("Failed to generate PDF");
    }

    return pdf;
  } catch (error) {
    throw new ResponseError(error.status, error.message);
  }
};

const searchDevices = async (name) => {
  try {
    const limit = 5;
    // cek dulu apakah di db ada nama device yang mengandung isi pencarian
    let results = await mongoDbUtils.findDevicesContaintName(name, limit);
    // hitung ada berapa di db jika kurang dari 5 maka cari data yang kurang di api gsmarena
    if (results.length < limit) {
      results = await gsmarena.search.search(name);

      // ketika sesudah mengambil api gsmarena jangan lupa simpan ke db tapi cek jangan sampai data duplikat di simpan
      const operations = results.map((device) => {
        return {
          updateOne: {
            filter: { name: device.name }, // Cari berdasarkan field unik
            update: { $setOnInsert: device }, // Hanya insert jika belum ada
            upsert: true,
          },
        };
      });
      await mongoDbUtils.saveWithBulkwrite(operations);
      results = await mongoDbUtils.findDevicesContaintName(name, limit);
    }

    return results;
  } catch (error) {
    throw new ResponseError(error.status, error.message);
  }
};

const getReviews = async (deviceId) => {
  try {
    const results = await prisma.review.findMany({
      where : {
        device_id : deviceId
      },
      select : {
        id : true,
        rating : true,
        review_text : true,
        device_id : true,
        user_id : true,
        users : {
          select : {
            username : true
          }
        }
      }

    })

    return results;
  } catch (error) {
    throw new ResponseError(error.status, error.message);
  }
}

const getAverageRating = async (deviceId) => {
  try {
    const averageRating = await prisma.review.aggregate({
      _avg: {
        rating: true,
      },
      where: {
        device_id: deviceId,
      },
    });
    console.log(averageRating);
    
    return averageRating;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

export default {
  fetchAllPopularDevices,
  fetchDetailDevice,
  createFilePdfDetailDevice,
  searchDevices,
  getReviews,
  getAverageRating
};
