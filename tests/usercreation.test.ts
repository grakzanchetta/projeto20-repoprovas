import app from "../src/app";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import prisma from "../src/databases/database";

const newUserEmail: string = faker.internet.email();
const newUserPassword: string = faker.random.alpha(10);
const incorrectPassword: string = faker.random.alpha(5);
const newUserConfirmedPassword: string = faker.random.alpha(10);

describe("Testing route POST /signup", () => {
  it("Should return status 201 when correct data is informed", async () => {
    const body = {
      email: newUserEmail,
      password: newUserPassword,
      confirmPassword: newUserPassword,
    };

    const result = await supertest(app).post("/signup").send(body);
    const status = result.status;

    expect(status).toEqual(201);
  });
  it("Should return status 422 when email isn't informed", async () => {
    const body = {
      email: "",
      password: newUserPassword,
      confirmPassword: newUserPassword,
    };

    const result = await supertest(app).post("/signup").send(body);
    const status = result.status;

    expect(status).toEqual(422);
  });
  it("Should return status 422 when password isn't informed", async () => {
    const body = {
      email: newUserEmail,
      password: "",
      confirmPassword: newUserPassword,
    };

    const result = await supertest(app).post("/signup").send(body);
    const status = result.status;

    expect(status).toEqual(422);
  });
  it("Should return status 422 when password isn't long enough", async () => {
    const body = {
      email: newUserEmail,
      password: incorrectPassword,
      confirmPassword: incorrectPassword,
    };

    const result = await supertest(app).post("/signup").send(body);
    const status = result.status;

    expect(status).toEqual(422);
  });
  it("Should return status 422 when confirmPassword doesn't match with password", async () => {
    const body = {
      email: newUserEmail,
      password: newUserPassword,
      confirmPassword: newUserConfirmedPassword,
    };

    const result = await supertest(app).post("/signup").send(body);
    const status = result.status;

    expect(status).toEqual(422);
  });
  it("Should return status 409 when trying to register a new user with an email already registered", async () => {
    const body = {
      email: "testuser@testuser.com",
      password: "newUserPassword",
      confirmPassword: "newUserPassword",
    };

    await supertest(app).post("/signup").send(body);
    const result = await supertest(app).post("/signup").send(body);
    const status = result.status;

    expect(status).toEqual(409);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
