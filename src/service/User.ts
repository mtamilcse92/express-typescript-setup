import UserRepo from "../repository/User";

export default new class UserService extends UserRepo {
    public async getUsers() {
        return await super.find();
    }

    public async saveUser(payload: object) {
        return await super.save(payload);
    }

    public async updateUser(id: string, payload: object) {
        return await super.update(id, payload);
    }

    public async deleteUser(id: string) {
        return await super.delete(id);
    }
};