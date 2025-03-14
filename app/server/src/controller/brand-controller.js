import brandService from "../service/brand-service.js";

const getBrands = async (req, res, next) => {
  try {
    const results = await brandService.fetchBrands();
    return results;
  } catch (error) {
    next(error)
  }
};


const getDevicesByBrand = async (req, res, next) => {
    const brandId = req.params.id;
  try {
    const results = await brandService.fetchDeviceListByBrand(brandId);
    return results;
  } catch (error) {
    next(error)
  }
};


export default {
  getBrands,
  getDevicesByBrand
};
