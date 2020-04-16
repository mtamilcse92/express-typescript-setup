import getModel from "../models/ModelMap";
import { User } from "../models/User";


export default class CrudRepo {
    modelName: string;
    constructor(modelName: string) {
        this.modelName= modelName;
    }
    public async find(query: object = {}) {
        return await User.find(query);
    }

    public async save(payload: object) {
        return await User.create(payload);
    }

    public async update(_id: string, payload: object) {
        return await User.findOneAndUpdate({ _id }, payload);
    }

    public async updateByQuery(query: object, payload: object) {
        return await User.update(query, payload, { upsert: true });
    }

    public async delete(_id: string) {
        return await User.remove({ _id });
    }
    public async deleteByQuery(query: object) {
        return await User.deleteMany(query);
    }
}