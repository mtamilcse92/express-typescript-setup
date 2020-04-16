import * as express from "express";
import BaseController from "./BaseController";
import client from "./client";
export default new class UserController extends BaseController {
    public async getUser(req: express.Request, res: express.Response): Promise<void | any> {
        try {
            client.listUsers({}, (err: any, result: any) => {
                console.log(result, err);
                
                return super.ok(res, { users: result });
              });
        } catch (err) {
            return super.internalError(res, err);
        }
    }

    public async createUser(req: express.Request, res: express.Response): Promise<void | any> {
        try {
            const userInfo: object = super.getBody(req);
            return super.ok(res, { userInfo });
        } catch (err) {
            return super.internalError(res, err);
        }
    }

    public async updateUser(req: express.Request, res: express.Response): Promise<void | any> {
        try {
            const id: string = super.getParam(req, "id");
            const userInfo: object = super.getBody(req);
            return super.accepted(res, { userInfo });
        } catch (err) {
            return super.internalError(res, err);
        }
    }


    public async deleteUser(req: express.Request, res: express.Response): Promise<void | any> {
        try {
            const id: string = super.getParam(req, "id");
            return super.ok(res);
        } catch (err) {
            return super.internalError(res, err);
        }
    }
};