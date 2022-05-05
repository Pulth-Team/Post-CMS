import request from "supertest";
import { app } from "../../../app";

it("fails when a email that does not exist is supplied", async () => {
  await request(app)
    .post("/api/auth/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
  await request(app)
    .post("/api/auth/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/auth/signin")
    .send({
      email: "test@test.com",
      password: "pswrd",
    })
    .expect(400);
});

it("responds with a cookie when given valid credentials", async () => {
  await request(app)
    .post("/api/auth/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/auth/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});

it("fails when credentials not supplied", async () => {
  await request(app)
    .post("/api/auth/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await request(app).post("/api/auth/signin").send({}).expect(400);
});

it("fails when email and password not supplied", async () => {
  await request(app)
    .post("/api/auth/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/auth/signin")
    .send({
      email: "test@test.com",
    })
    .expect(400);

  await request(app)
    .post("/api/auth/signin")
    .send({
      password: "password",
    })
    .expect(400);
});
