const app = require("../server");
const request = require("supertest");

const orderId = "65cfdff52c73a025bf8faa86";

describe("GET /orders", () => {
  it("should return all orders", async () => {
    return request(app)
      .get("/orders")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });
});

const orderBody = {
  names: ["Strawberry", "Apple"],
  users: [
    {
      name: "Mario",
      lastName: "Rossi",
      email: "mariorossi@test.it",
    },
    {
      name: "Laura",
      lastName: "Bianchi",
      email: "laurabianchi@test.it",
    },
  ],
};

describe("POST /orders", () => {
  it("should create an order", async () => {
    return request(app)
      .post("/orders")
      .send(orderBody)
      .expect(201)
      .then((res) => {
        expect(res.statusCode).toBe(201);
      });
  });
});

describe("PUT /orders", () => {
  it("should update an order", async () => {
    return request(app)
      .put(`/orders/${orderId}`)
      .send(orderBody)
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });
});

describe("DELETE /orders", () => {
  it("should delete an order", async () => {
    return request(app)
      .delete(`/orders/${orderId}`)
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });
});
