const request = require("supertest");
const app = require("./app");

describe("/auth/register route", () => {
  test("should respond with 200 status code", async () => {
   const response = await request
      .post("/auth/register")
      .send({ username: "username", password: "password" })
      expect(response.status).toEqual(200);
  });
});

describe("/pokemon route", () => {
    test("should respond pokemons", async () => {
        const response = await request
        .get("/pokemons")
        expect(response.body).toBeInstanceOf(Array);
    });
  });
  