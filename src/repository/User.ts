import { User } from "../models/User";
export default class UserRepo {
    public async find(query: object = {}) {
        return await User.find(query);
    }

    public async save(payload: object) {
        return await User.create(payload);
    }

    public async update(_id: string, payload: object) {
        return await User.findOneAndUpdate({ _id }, payload, { upsert: true });
    }

    public async delete(_id: string) {
        return await User.remove({ _id });
    }
}