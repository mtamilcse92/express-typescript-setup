import _ from "lodash";
import Crud from "../../src/repository/Crud";

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

let id: string;

describe("REPOSITORY: Crud", () => {
    const repo = new Crud("User");
    
    it("should insert the User information", async done => {
        const data: any = await repo.save(payload);
        id = data._id;
        expect(data.email).toEqual(payload.email)
        done();
    });

    it("should return the saved information", async done => {
        const data: any = await repo.find();
        expect(_.isEmpty(data)).toBeFalsy();
        done();
    });

    it("should update the User information", async done => {
        await repo.update(id, {email: "update@gmail.com"});
        const [update]: any = await repo.find();
        expect(update.email).toEqual("update@gmail.com")
        done();
    });
      
    it("should delete the User information", async done => {
        const data: any = await repo.delete(id);
        expect(data.deletedCount).toEqual(1)
        done();
    });

    it("should update the User information", async done => {
        const data: any = await repo.find();
        expect(_.isEmpty(data)).toBeTruthy();
        done();
    });
})