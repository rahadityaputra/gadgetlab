import request from "supertest";
import { app } from "../src/app.js";
import { prisma } from "../src/configuration/prisma.js";
import nodemailer from "nodemailer";
import { ResponseError } from "../src/error/response-error.js";
const bcrypt = require("bcrypt");


jest.mock("../src/service/user-service.js", () => ({
  sendVerificationCode: jest.fn().mock,
  register: jest.fn(() =>
    Promise.resolve({
      id: "1",
      username: "jondoe123",
      email: "jon@gmail.com",
      name:  "John Doe",
    })
  ),
  verifyVerificationCode: jest.fn().mockRejectedValue(new ResponseError("401", "kode salah")),
  activedUserVerification: jest.fn(() => Promise.resolve()),
}));

// Membuat pengguna palsu untuk tes
const dummyUser = {
  name: "John Doe",
  username: "jondoe123",
  email: "jon@gmail.com",
  password: "Password#123",
  passwordConfirmation: "Password#123",
};

describe("POST /api/users", () => {
  // Sebelum setiap tes, kita bersihkan data pengguna
  let userId;
  beforeEach(async () => {
    await prisma.user.deleteMany({});
  });

  it("seharusnya mengirimkan kode ke email yang didaftarkan", async () => {
    const response = await request(app).post("/api/users").send(dummyUser);
    console.log(response.body);
    userId = response.body.data.userId;
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("userId");
    expect(response.body.data).toHaveProperty("message");
  });

  it("seharusnya mengirimkan status kode 401 setelah kode verifikasi dikirimkan dengan salah", async () => {
    const response = await request(app).post("/api/users/register/verify-verification-code").send({
      code : "123456",
      userId
    });

    console.log(response.body);
    expect(response.status).toBe(401);
  });

  // it("seharusnya gagal pendaftaran karena kode salah dimasukkan", async () => {
  //   const response = await request(app).post("/api/users/register/verify-verification-code").send({
  //     code : "salah",
  //     userId
  //   });

  //   console.log(response.body);
  //   expect(response.status).toBe(400);
  // });

  // it("should return 400 if password is missing", async () => {
  //   const response = await request(app).post("/api/users").send({
  //     name: "John Doe",
  //     username: "jondoe123",
  //     passwordConfirmation: "Password#123",
  //   });

  //   console.log(response.body);
  //   expect(response.status).toBe(400);
  // });

  // it("should return 400 if email already exists", async () => {
  //   // Membuat pengguna dummy terlebih dahulu
  //   await prisma.user.create({
  //     data: {
  //       name: "John Doe",
  //       username: "jondoe123",
  //       password: "Password#123",
  //       email: "john@gmail.com",
  //     }
  //   });

  //   const response = await request(app).post("/api/users").send(dummyUser);
  //   console.log(response.body);

  //   expect(response.status).toBe(400);
  // });

  afterEach(async () => {
    await prisma.user.deleteMany({});
  });
});
