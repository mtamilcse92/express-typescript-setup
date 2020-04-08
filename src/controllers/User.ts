import * as express from "express";
import BaseController from "./BaseController";
import UserService from "../service/User";
export default new class UserController extends BaseController {
    public async getUser(req: express.Request, res: express.Response): Promise<void | any> {
        try {
            const users: object[] = await UserService.getUsers();
            return super.ok(res, { users });
        } catch (err) {
            return super.internalError(res, err);
        }
    }

    public async createUser(req: express.Request, res: express.Response): Promise<void | any> {
        try {
            const userInfo: object = super.getBody(req);
            await UserService.saveUser(userInfo);
            return super.ok(res, { userInfo });
        } catch (err) {
            return super.internalError(res, err);
        }
    }

    public async updateUser(req: express.Request, res: express.Response): Promise<void | any> {
        try {
            const id: string = super.getParam(req, "id");
            const userInfo: object = super.getBody(req);
            await UserService.updateUser(id,userInfo);
            return super.accepted(res, { userInfo });
        } catch (err) {
            return super.internalError(res, err);
        }
    }


    public async deleteUser(req: express.Request, res: express.Response): Promise<void | any> {
        try {
            const id: string = super.getParam(req, "id");
            await UserService.deleteUser(id);
            return super.ok(res);
        } catch (err) {
            return super.internalError(res, err);
        }
    }
};