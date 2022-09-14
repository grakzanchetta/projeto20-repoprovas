import app from "../src/app";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import prisma from "../src/databases/database";

const newUserEmail: string = faker.internet.email();
const newUserPassword: string = faker.random.alpha(10);

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "Users"`;
});

describe("Testing route GET /discipline", () => {
  it("Should return status 200 when the user get the assignments listed by disicpline", async () => {
    const body = {
      email: newUserEmail,
      password: newUserPassword,
      confirmPassword: newUserPassword,
    };

    await supertest(app).post("/signup").send(body);

    const newUser = {
      email: newUserEmail,
      password: newUserPassword,
    };

    const loggedUser = await supertest(app).post("/signin").send(newUser);
    const token = loggedUser.text;

    const result = await supertest(app)
      .get(`/discipline`)
      .set({ Authorization: `Bearer ${token}` })
      .send();

    expect(result.body).toBeInstanceOf(Object);
  });

  it("Should return status 401 when the user try to get the assignments but the token isn't informed", async () => {
    const body = {
      email: newUserEmail,
      password: newUserPassword,
      confirmPassword: newUserPassword,
    };

    await supertest(app).post("/signup").send(body);

    const newUser = {
      email: newUserEmail,
      password: newUserPassword,
    };

    await supertest(app).post("/signin").send(newUser);
    const token = null;

    const result = await supertest(app)
      .get(`/discipline`)
      .set({ Authorization: `Bearer ${token}` })
      .send();

    expect(result.status).toEqual(401);
  });

  it("Should return status 401 when the user try to get the assignments but the token information is wrong", async () => {
    const body = {
      email: newUserEmail,
      password: newUserPassword,
      confirmPassword: newUserPassword,
    };

    await supertest(app).post("/signup").send(body);

    const newUser = {
      email: newUserEmail,
      password: newUserPassword,
    };

    await supertest(app).post("/signin").send(newUser);
    const token = "i_am_not_a_token";

    const result = await supertest(app)
      .get(`/discipline`)
      .set({ Authorization: `Bearer ${token}` })
      .send();

    expect(result.status).toEqual(401);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
