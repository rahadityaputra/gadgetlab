import deviceService from "../service/device-service.js";

const getPopularDevices = async (req, res, next) => {
  try {
    const devices = await deviceService.fetchAllPopularDevices();
    res.status(200).json({
      data: devices,
    });
  } catch (error) {
    next(error);
  }
};

const getDetailDevice = async (req, res, next) => {
  const deviceId = req.params.id;
  try {
    const result = await deviceService.fetchDetailDevice(deviceId);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getPdfFileDetailDevice = async (req, res, next) => {
  const deviceId = req.params.id;
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=${deviceId}.pdf`);

  try {
    const result = await deviceService.createFilePdfDetailDevice(deviceId);
    result.pipe(res);
  } catch (error) {
    next(error);
  }
};

const getResultSearchDevices = async (req, res, next) => {
  const name = req.query.name;

  try {
    const results = await deviceService.searchDevices(name);

    res.status(200).json({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

const getReviews = async (req, res, next) => {
  const deviceId = req.params.device_id;
  console.log(deviceId);
  
  try {
    const results = await deviceService.getReviews(deviceId);
    res.status(200).json({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

const getAverageRating = async (req, res, next) => {
  const deviceId = req.params.device_id;
  console.log(deviceId);
  
  try {
    const averageRating = await deviceService.getAverageRating(deviceId);
    
    res.status(200).json({
      data: {
        averageRating: averageRating._avg.rating,
      }
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getPopularDevices,
  getDetailDevice,
  getPdfFileDetailDevice,
  getResultSearchDevices,
  getReviews,
  getAverageRating,
};
