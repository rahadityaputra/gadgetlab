import gsmarena from "gsmarena-api";
import { ResponseError } from "../error/response-error.js";


const fetchBrands = async () => {
    try {
        const results = await gsmarena.catalog.getBrands();
        return results;
    } catch (error) {
        throw new ResponseError(500, error.message);
    }
}


const fetchDeviceListByBrand = async (id) => {
    try {
        const results = await gsmarena.catalog.getBrand(id);
        return results;
    } catch (error) {
        throw new ResponseError(500, error.message);
    }
}

export default {
    fetchBrands,
    fetchDeviceListByBrand
}