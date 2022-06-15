import request from "supertest";
import { app } from "../../../app";

it("Fails when userId is not type of ObjectId", async () => {
  await request(app).get(`/api/article/user/1234`).expect(400);
});

it("fails when skip and limit parameter is not numeric", async () => {
  //Signing up and getting userId and session cookie
  const response = await request(app)
    .post("/api/auth/signup")
    .send({
      username: "username",
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
  //Create article with userId and session cookie
  await request(app)
    .post("/api/article/create")
    .set("Cookie", response.get("Set-Cookie"))
    .send({
      time: 1651867755888,
      blocks: [
        {
          id: "F0a2eDGFcT",
          type: "Header",
          data: {
            text: "TEST",
            level: 2,
          },
        },
      ],
      version: "2.24.3",
    });
  //Parameters are tested whether they are numeric
  await request(app)
    .get(`/api/article/user/${response.body.id}?skip=asd`)
    .expect(400);
  await request(app)
    .get(`/api/article/user/${response.body.id}?limit=asd`)
    .expect(400);
  await request(app)
    .get(`/api/article/user/${response.body.id}?skip=asd&limit=1`)
    .expect(400);
  await request(app)
    .get(`/api/article/user/${response.body.id}?skip=1&limit=asd`)
    .expect(400);
  await request(app)
    .get(`/api/article/user/${response.body.id}?skip=asd&limit=asd`)
    .expect(400);
});
