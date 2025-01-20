import request from "supertest";
import { app } from "../src/app.js";
import jwtUtlils from "../src/utils/jwtUtlils.js";

const SECRET_KEY = "Sin#cos#tan123"; // Sama dengan secret di endpoint

describe("GET /api/user/current", () => {
  let validToken, notValidToken;
  beforeEach(async () => {
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
      privateKey : "salah",
      options: {
        expiresIn: "1h",
      },
    });
  });

  test("Mengembalikan data user jika token valid", async () => {
    const response = await request(app)
      .get("/api/users/current")
      .set("Authorization", `Bearer ${validToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toEqual({
      username: "rahaditya",
      name: "Rahaditya",
      email: "rahaditya@gmail.com",
    });
  });

  test("Mengembalikan 401 jika token tidak valid", async () => {
    const response = await request(app)
      .get("/api/users/current")
      .set("Authorization", `Bearer ${notValidToken}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("errors", "invalid signature");
  });

  test("Mengembalikan 401 jika token tidak diberikan", async () => {
    const response = await request(app).get("/api/users/current");
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("errors", "Access token missing");
  }, 2000000);

  // test('Mengembalikan 401 jika token format salah', async () => {
  //   const response = await request(app)
  //     .get('/api/users/current')
  //     .set('Authorization', 'InvalidFormat');

  //   expect(response.status).toBe(401);
  //   expect(response.body).toHaveProperty('message', 'Token tidak ditemukan');
  // });

  // test('Mengembalikan 401 jika token kedaluwarsa', async () => {
  //   const expiredToken = jwt.sign({ id: 1, username: 'testuser' }, SECRET_KEY, { expiresIn: '-1s' });

  //   const response = await request(app)
  //     .get('/api/user/current')
  //     .set('Authorization', `Bearer ${expiredToken}`);

  //   expect(response.status).toBe(401);
  //   expect(response.body).toHaveProperty('message', 'Token tidak valid');
  // });
});
