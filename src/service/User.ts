import CrudRepo from "../repository/Crud";
import { ModelName } from "../models/ModelMap";

export default new class UserService extends CrudRepo {
    constructor() {
        super(ModelName.User);
    }
    public async getUsers(): Promise<object[]> {
        return await super.find();
    }

    public async saveUser(payload: object): Promise<void | object> {
        return await super.save(payload);
    }

    public async updateUser(id: string, payload: object): Promise<void | object> {
        return await super.update(id, payload);
    }

    public async deleteUser(id: string): Promise<void | object> {
        return await super.delete(id);
    }
};