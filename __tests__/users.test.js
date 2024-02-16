const app = require("../server");
const request = require("supertest");
const userId = "65cf71db4151c050c9e55101";

describe("GET /users", () => {
  it("should return all users", async () => {
    return request(app)
      .get("/users")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });
});

const userBody = {
  name: "Mario",
  lastName: "Rossi",
  email: "mariorossi@test.it",
};

describe("POST /users", () => {
  it("should create a user", async () => {
    return request(app)
      .post("/users")
      .send(userBody)
      .expect(201)
      .then((res) => {
        expect(res.statusCode).toBe(201);
      });
  });
});

const userBodyEmailWrong = {
  name: "Mario",
  lastName: "Rossi",
  email: "mariorossi",
};

describe("POST /users wrong email", () => {
  it("should throw an error", async () => {
    return request(app)
      .post("/users")
      .send(userBodyEmailWrong)
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
      });
  });
});

describe("PATCH /users", () => {
  it("should update a user", async () => {
    return request(app)
      .patch(`/users/${userId}`)
      .send(userBody)
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });
});

describe("PATCH /users", () => {
  it("should throw an error", async () => {
    return request(app)
      .patch(`/users/${userId}`)
      .send(userBodyEmailWrong)
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
      });
  });
});

describe("DELETE /users", () => {
  it("should delete a user", async () => {
    return request(app)
      .delete(`/users/${userId}`)
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });
});
