import request from "supertest";
import { app } from "../src/app.js";
import jwtUtlils from "../src/utils/jwtUtlils.js";
import userService from "../src/service/user-service.js";
import deviceService from "../src/service/device-service.js";

const SECRET_KEY = "Sin#cos#tan123"; // Sama dengan secret di endpoint

describe("GET /api/users/:user_id/favorites", () => {
  let validToken, notValidToken, user_id, device_id, device_name, device_img;
  beforeEach(async () => {
    try {
      
      validToken = await jwtUtlils.createToken({
        payload: {
          username: "rahaditya",
        },
        privateKey: SECRET_KEY,
        options: {
          expiresIn: "1h",
        },
      });
  
      notValidToken = await jwtUtlils.createToken({
        payload: {
          username: "tidakAda",
        },
        privateKey: "salah",
        options: {
          expiresIn: "1h",
        },
      });
  
      const user = await userService.getUserData("rahaditya");
      user_id = user.id;
  
      const device = await deviceService.fetchDetailDevice(
        "apple_iphone_13_pro_max-11089"
      );
      device_id = device.id;
      device_img = device.img;
      device_name = device.name;
    } catch (error) {
      
    }
  });

  test("Mengembalikan data user jika token valid", async () => {
    const response = await request(app)
      .post(`/api/users/${user_id}/favorites`)
      .set("Authorization", `Bearer ${validToken}`)
      .send({
        device_id: device_id,
        device_name: device_name,
        device_img: device_img,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toEqual({
      user_id : user_id,
      device_id: "apple_iphone_13_pro_max-11089",
      device_name: "Apple iPhone 13 Pro Max",
      device_img:
        "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro-max.jpg",
    });
  });


  test("harusnya error user not found", async () => {
    const response = await request(app)
      .post(`/api/users/77/favorites`)
      .set("Authorization", `Bearer ${validToken}`)
      .send({
        device_id: device_id,
        device_name: device_name,
        device_img: device_img,
      });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("errors");
    // expect(response.body.data).toEqual();
  });
});
