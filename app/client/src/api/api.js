import axios from "axios";

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
          console.log("ini login");
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
    return response;
  } catch (error) {
    throw error;
  }
};

const login = async (request) => {
  try {
    const response = await api.post("/users/login", request);
    return response;
  } catch (error) {
    throw error;
  }
};

export default {
  getPopularDevices,
  register,
  login,
  verifyVerificationCode,
};
