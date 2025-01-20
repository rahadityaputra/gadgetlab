import request from "supertest";
import { app } from "../src/app.js";
import { prisma } from "../src/configuration/prisma.js";
import jwtUtlils from "../src/utils/jwtUtlils.js";
const bcrypt = require("bcrypt");

describe("POST /api/users/login", () => {
  let correntToken;
  beforeEach(async () => {
    // membuat akun terlebih dahulu untuk keperluan testing login user

    const password = await bcrypt.hash("Password123#", 10);
    const dummyUser = {
      username: "bowo123456",
      email: "bowo@gmail.com",
      name: "bowo asu",
      password: password,
    };

    await prisma.user.create({
      data: dummyUser,
    });

    correntToken = await jwtUtlils.createToken(dummyUser.username);
  });

  // Test login berhasil
  it("should return 200 and success message when valid credentials are provided", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "bowo@gmail.com",
      password: "Password123#",
    });

    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: {
        token: correntToken,
      },
    });
  });

  // Test login gagal dengan kredensial salah
  it("should return 401 and error message when invalid credentials are provided", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "bowo@gmail.com",
      password: "Wrongpassword##12",
    });
    console.log(response.body);
    expect(response.status).toBe(401);
  });

  // Test login gagal dengan username yang tidak ada
  it("should return 401 and error message when email is invalid", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "bowohahaha@gmail.com",
      password: "Wrongpassword##12",
    });

    console.log(response.body);
    expect(response.status).toBe(401);
  });

  // Test login gagal dengan body kosong
  it("should return 400 when the request body is empty", async () => {
    const response = await request(app).post("/api/users/login").send({});

    console.log(response.body);
    expect(response.status).toBe(400);
  });

  afterEach(async () => {
    // membuat akun terlebih dahulu untuk keperluan testing login user
    await prisma.user.deleteMany({});
  });
});
