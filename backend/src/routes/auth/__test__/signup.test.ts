import request from "supertest";
import { app } from "../../../app";

it("retuns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/auth/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});

it("retuns a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/auth/signup")
    .send({
      email: "testtestcom",
      password: "password",
    })
    .expect(400);
});

it("retuns a 400 with an invalid password", async () => {
  return request(app)
    .post("/api/auth/signup")
    .send({
      email: "test@test.com",
      password: "pswrd",
    })
    .expect(400);
});

it("retuns a 400 with missing email and password", async () => {
  await request(app)
    .post("/api/auth/signup")
    .send({ email: "test@test.com" })
    .expect(400);
  await request(app)
    .post("/api/auth/signup")
    .send({ password: "password" })
    .expect(400);
});

it("dissallows duplicate emails", async () => {
  await request(app)
    .post("/api/auth/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
  await request(app)
    .post("/api/auth/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/auth/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
