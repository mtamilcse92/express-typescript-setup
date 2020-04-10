import _ from "lodash";
import request from "supertest";
import App from "../../src/app";

import {
    connect,
    clearDatabase,
    closeDatabase
} from "../db-helper";

beforeAll(async (): Promise<void> => await connect());
afterAll(async (): Promise<void> => {
    await clearDatabase();
    await closeDatabase()
});


describe("API: User Flow Api test", () => {
    const app: any = new App().app;

    it("should return 200 and return user information", done => {
        return request(app).get("/api/v1/users")
            .expect(200).end((err, res) => {
                expect(_.isArray(res.body.users)).toBe(true);
                done();
            });
    });

    it("should return 422 when request body is empty", (done) => {
        return request(app).post("/api/v1/users")
            .set('Accept', 'application/json')
            .expect(422, done)
    });

    it("should return 200 and save the data", (done) => {
        return request(app).post("/api/v1/users")
            .send({
                "email": "test3@gmail.com",
                "password": "test1234"
            })
            .set('Accept', 'application/json')
            .expect(200, done)
    });

});
