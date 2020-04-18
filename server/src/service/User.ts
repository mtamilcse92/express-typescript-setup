import CrudRepo from "../repository/Crud";
import { ModelName } from "../models/ModelMap";

export default new class UserService extends CrudRepo {
    constructor() {
        super(ModelName.User);
    }
    public async getUsers(call: any, callback: any): Promise<any> {
        try {
            const users: any = await super.find();
            callback(null, { users })
        } catch (error) {
            console.error(error);

        }
    }

    public async saveUser(call: any, callback: any): Promise<void | object> {
        try {
            const { request: payload } = call;
            const user: any = await super.save(payload);
            callback(null, user);
        } catch (err) {
            callback(err);
        }
    }

    public async updateUser(call: any, callback: any): Promise<void | object> {
        try {
            const { request: payload } = call;
            const { _id, ...userInfo } = payload;
            const user: any = await super.update(_id, userInfo);
            callback(null, user);
        } catch (err) {
            callback(err);
        }
    }

    public async deleteUser(call: any, callback: any): Promise<void | object> {
        try {
            const { request: payload } = call;
            await super.delete(payload.id);
            callback(null, payload.id);
        } catch (err) {
            
            callback(err);
        }
    }
};