import request from "supertest";
import App from "../src/app";

describe("GET /api/v1/ping", () => {
    const app: any = new App().app;

    it("should return 200 OK", () => {
        return request(app).get("/api/v1/ping")
            .expect(200);
    });


    it("should return 404", (done) => {
        request(app).get("/reset")
            .expect(404, done);
    });

});
