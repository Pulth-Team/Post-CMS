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
