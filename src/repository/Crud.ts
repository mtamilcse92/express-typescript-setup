import getModel from "../models/ModelMap";

export default class CrudRepo {
    modelName: string;
    constructor(modelName: string) {
        this.modelName= modelName;
    }
    public async find(query: object = {}) {
        return await getModel(this.modelName).find(query);
    }

    public async save(payload: object) {
        return await getModel(this.modelName).create(payload);
    }

    public async update(_id: string, payload: object) {
        return await getModel(this.modelName).findOneAndUpdate({ _id }, payload, { upsert: true });
    }

    public async updateByQuery(query: object, payload: object) {
        return await getModel(this.modelName).update(query, payload, { upsert: true });
    }

    public async delete(_id: string) {
        return await getModel(this.modelName).remove({ _id });
    }
    public async deleteByQuery(query: object) {
        return await getModel(this.modelName).deleteMany(query);
    }
}