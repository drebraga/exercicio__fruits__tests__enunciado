import supertest from "supertest";
import app from "../src/app";
import httpStatus from "http-status";

const server = supertest(app);

describe("GET /health", () => {
  it("should respond with code 200", async () => {
    const result = await server.get("/health");
    expect(result.status).toBe(httpStatus.OK);
  });
});
