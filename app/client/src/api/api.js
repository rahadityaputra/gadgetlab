import axios from "axios";
import {getToken} from "../utils/utils.js";

const api = axios.create({
  baseURL: "http://localhost:3000/api/",
});

const getPopularDevices = async () => {
  try {
    const respose = await api.get("/devices/popular");
    const devices = respose.data.data;
    return devices;
  } catch (error) {
    throw error;
  }
};

const getPdfFileDetailDevice = async (device_id) => {
  try {
    console.log(device_id);
    const response = await api.get(`/devices/${device_id}/export`, {
      responseType : "blob"
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const getDeviceDetail = async (device_id) => {
  try {
    const response = await api.get(`/devices/${device_id}`);
    const devices = response.data.data;
    return devices;
  } catch (error) {
    throw error;
  }
}



const getDeviceReviews = async (device_id) => {
  try {
    const response = await api.get(`/devices/${device_id}/reviews`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
}


const register = async (request) => {
  try {
    const response = await api.post("/users", request);
    return response;
  } catch (error) {
    throw error;
  }
};

const verifyVerificationCode = async (request, code, action) => {
  
  try {
    let response;
    switch (action) {
      case "register":
        console.log("ini register");
        response = await api.post(
          "/users/register/verify-verification-code",
          {
            ...request,
            code,
          }
        );
        
        break;
        case "login":
          response = await api.post(
            "/users/login/verify-verification-code",
            {
              ...request,
              code,
            }
          );
        break;
      default:
        break;
    }
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

const login = async (request) => {
  try {
    const response = await api.post("/users/login", request);
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};


const setHeader = () => {
  const token = getToken();
  return {
    "Authorization" : `Bearer ${token}`
  }
}

const addReview = async (deviceId, reviewText, rating = 5) => {
  const headers = setHeader();
  try {
    const response = await api.post(`/users/current/devices/${deviceId}/reviews`, 
      {
        reviewText,
        rating
      },
      {
        headers,
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
}

const getUserData = async () => {
  const headers = setHeader();
  try {
    const response = await api.get(`/users/current`, {
      headers
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
}

export default {
  getPopularDevices,
  register,
  login,
  verifyVerificationCode,
  getUserData,
  getDeviceDetail,
  getPdfFileDetailDevice,
  addReview,
  getDeviceReviews
};
