const app = require("../server");
const request = require("supertest");

const productId = "65cf4ce0169ef41c20424d9e";

describe("GET /products", () => {
  it("should return all products", async () => {
    return request(app)
      .get("/products")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });
});

const productBody = {
  name: "Apple",
};

describe("POST /products", () => {
  it("should create a product", async () => {
    return request(app)
      .post("/products")
      .send(productBody)
      .expect(201)
      .then((res) => {
        expect(res.statusCode).toBe(201);
      });
  });
});

describe("PUT /products", () => {
  it("should update a product", async () => {
    return request(app)
      .put(`/products/${productId}`)
      .send(productBody)
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });
});

describe("DELETE /products", () => {
  it("should delete a product", async () => {
    return request(app)
      .delete(`/products/${productId}`)
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });
});
