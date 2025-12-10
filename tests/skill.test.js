const request = require("supertest");
const app = require("../server");

describe("Skill API Tests", () => {
  it("GET /api/skills/ should return 200", async () => {
    const res = await request(app).get("/api/skills/");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /api/skills/:id should return 400 for invalid ID", async () => {
    const res = await request(app).get("/api/skills/invalidID");
    expect(res.statusCode).toBe(400);
  });
});
