const request = require("supertest");
const app = require("../server");

describe("User API Tests", () => {
  it("GET /api/users/ should return 200", async () => {
    const res = await request(app).get("/api/users/");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /api/users/:id should return 400 for invalid ID", async () => {
    const res = await request(app).get("/api/users/invalidID");
    expect(res.statusCode).toBe(400);
  });
});
