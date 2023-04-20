import supertest from "supertest";
import app from "../src/app";
import httpStatus from "http-status";

const server = supertest(app);

describe("/fruits", () => {
  it("POST /fruits should respond with code 201", async () => {
    const fruit = {
      name: "Maça",
      price: 10.15,
    };
    const result = await server.post("/fruits").send(fruit);
    expect(result.status).toBe(httpStatus.CREATED);
  });

  it("POST /fruits should respond with code 422", async () => {
    const fruit = {
      name: "Banana",
    };
    const result = await server.post("/fruits").send(fruit);
    expect(result.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("POST /fruits should respond with code 409", async () => {
    const fruit = {
      name: "Maça",
      price: 10.15,
    };
    const result = await server.post("/fruits").send(fruit);
    expect(result.status).toBe(httpStatus.CONFLICT);
  });

  it("GET /fruits should respond with code 200", async () => {
    const result = await server.get("/fruits");
    expect(result.body.length).toBe(1);
  });

  it("GET /fruits/:id should respond with code 200", async () => {
    const result = await server.get("/fruits/1");
    expect(result.body).toStrictEqual({
      name: "Maça",
      price: 10.15,
      id: 1,
    });
  });

  it("GET /fruits/:id should respond with code 404", async () => {
    const result = await server.get("/fruits/2");
    expect(result.status).toBe(httpStatus.NOT_FOUND);
  });
});
