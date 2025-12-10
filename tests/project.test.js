const request = require("supertest");
const app = require("../server");

describe("Project API Tests", () => {
  it("GET /api/projects/ should return 200", async () => {
    const res = await request(app).get("/api/projects/");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /api/projects/:id should return 400 for invalid ID", async () => {
    const res = await request(app).get("/api/projects/invalidID");
    expect(res.statusCode).toBe(400);
  });
});
