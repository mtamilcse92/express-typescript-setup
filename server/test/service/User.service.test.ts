import _ from "lodash";
import user from "../../src/service/User";
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

const payload: any ={
    "email": "test3@gmail.com",
    "password": "test1234"
};

describe("SERVICE: User", () => {
    it("should insert the User information", async done => {
        const data: any = await user.saveUser(payload);
        expect(data.email).toEqual(payload.email)
        done();
    });
})