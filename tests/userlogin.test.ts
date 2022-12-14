import app from "../src/app";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import prisma from "../src/databases/database";

const newUserEmail: string = faker.internet.email();
const newUserPassword: string = faker.random.alpha(10);
const incorrectPassword: string = faker.random.alpha(5);

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "Users"`;
  await prisma.$executeRaw`TRUNCATE TABLE "Tests"`;
});

describe("Testing route POST /signin", () => {
  it("Should return status 200 when correct dataUser is informed", async () => {
    const body = {
      email: "sou_um_email_de_teste@email.com",
      password: "sou_uma_senha_correta",
      confirmPassword: "sou_uma_senha_correta",
    };

    await supertest(app).post("/signup").send(body);

    const newUser = {
      email: body.email,
      password: body.password,
    };

    const result = await supertest(app).post("/signin").send(newUser);
    const status = result.status;
    expect(status).toEqual(200);
  });

  it("Should return status 422 when email isn't informed at login", async () => {
    const body = {
      email: newUserEmail,
      password: newUserPassword,
      confirmPassword: newUserPassword,
    };

    await supertest(app).post("/signup").send(body);

    const newUser = {
      email: "",
      password: newUserPassword,
    };

    const result = await supertest(app).post("/signin").send(newUser);
    const status = result.status;

    expect(status).toEqual(422);
  });

  it("Should return status 422 when password isn't informed at login", async () => {
    const body = {
      email: newUserEmail,
      password: newUserPassword,
      confirmPassword: newUserPassword,
    };

    await supertest(app).post("/signup").send(body);

    const newUser = {
      email: newUserEmail,
      password: "",
    };

    const result = await supertest(app).post("/signin").send(newUser);
    const status = result.status;

    expect(status).toEqual(422);
  });

  it("Should return status 422 when informed password isn't long enough", async () => {
    const body = {
      email: newUserEmail,
      password: newUserPassword,
      confirmPassword: newUserPassword,
    };

    await supertest(app).post("/signup").send(body);

    const newUser = {
      email: newUserEmail,
      password: incorrectPassword,
    };
    const result = await supertest(app).post("/signin").send(newUser);
    const status = result.status;

    expect(status).toEqual(422);
  });

  it("Should return status 404 when informed email isn't registered", async () => {
    const body = {
      email: newUserEmail,
      password: newUserPassword,
      confirmPassword: newUserPassword,
    };

    await supertest(app).post("/signup").send(body);

    const newUser = {
      email: "i_am_not_an_email@email.com",
      password: newUserPassword,
    };
    const result = await supertest(app).post("/signin").send(newUser);
    const status = result.status;

    expect(status).toEqual(404);
  });

  it("Should return status 404 when informed password isn't registered", async () => {
    const body = {
      email: newUserEmail,
      password: newUserPassword,
      confirmPassword: newUserPassword,
    };

    await supertest(app).post("/signup").send(body);

    const newUser = {
      email: newUserEmail,
      password: "IDontEvenRememberWhereIBorn",
    };

    const result = await supertest(app).post("/signin").send(newUser);
    const status = result.status;

    expect(status).toEqual(404);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
