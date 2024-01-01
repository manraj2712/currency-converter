import request from "supertest";

import { server } from "../dist/index";

describe("GET /api/get-currencies", () => {
  it("should return a list of currencies and coins", async () => {
    const response = await request(server).get("/api/get-currencies");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("currencies");
    expect(response.body).toHaveProperty("coins");
  });
});

describe("GET /api/convert/:from/:to/:amount", () => {
  it("should convert crypto to other currencies", async () => {
    const response = await request(server).get("/api/convert/bitcoin/usd/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("conversion");
    expect(response.body).toHaveProperty("from", "bitcoin");
    expect(response.body).toHaveProperty("to", "usd");
    expect(response.body).toHaveProperty("amount", 1);
  });

  it("should handle invalid conversion parameters", async () => {
    const response = await request(server).get(
      "/api/convert/invalid/from/amount"
    );
    expect(response.status).toBe(500);
  });
});

afterAll((done) => {
  server.close(done);
});
