import * as express from "express";
import BaseController from "./BaseController";
import client from "./client";
export default new class UserController extends BaseController {
    public async getUser(req: express.Request, res: express.Response): Promise<void | any> {
        try {
            client.listUsers({}, (err: any, result: any) => {
                if (err !== null) return super.internalError(res, err);
                return super.ok(res, { users: result });
            });
        } catch (err) {
            return super.internalError(res, err);
        }
    }

    public async createUser(req: express.Request, res: express.Response): Promise<void | any> {
        try {
            const userInfo: object = super.getBody(req);
            client.createUser(userInfo, (err: any, user: any) => {
                if (err !== null) return super.internalError(res, err);
                return super.ok(res, { user });
            });
        } catch (err) {
            return super.internalError(res, err);
        }
    }

    public async updateUser(req: express.Request, res: express.Response): Promise<void | any> {
        try {
            const _id: string = super.getParam(req, "id");
            const userInfo: object = super.getBody(req);

            client.updateUser(({ ...userInfo, _id }), (err: any, user: any) => {
                if (err !== null) return super.internalError(res, err);
                return super.accepted(res, { user });
            });
        } catch (err) {

            return super.internalError(res, err);
        }
    }


    public async deleteUser(req: express.Request, res: express.Response): Promise<void | any> {
        try {
            const id: string = super.getParam(req, "id");
            client.deleteUser({ id }, (err: any, user: any) => {
                if (err !== null) return super.internalError(res, err);
                return super.ok(res);
            });
        } catch (err) {
            return super.internalError(res, err);
        }
    }
};