const request = require("supertest");
const app = require("../server");

describe("Theme API Tests", () => {
  it("GET /api/themes/ should return 200", async () => {
    const res = await request(app).get("/api/themes/");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /api/themes/:id should return 400 for invalid ID", async () => {
    const res = await request(app).get("/api/themes/invalidid123");
    expect(res.statusCode).toBe(400);
  });
});
