import * as express from "express";

export default class BaseController {

    public static jsonResponse(
        res: express.Response, code: number, message: string
    ) {
        return res.status(code).json({ message });
    }

    public ok<T>(res: express.Response, body?: T) {
        if (!!body) {
            res.type("application/json");
            return res.status(200).json(body);
        }
        return res.sendStatus(200);
    }

    public accepted<T>(res: express.Response, body?: T) {
        if (!!body) {
            res.type("application/json");
            return res.status(202).json(body);
        }
        return res.sendStatus(202);
    }

    public getBody(req: express.Request) {
        return req.body;
    }


    public getParam(req: express.Request, key: string) {
        return req.params[key];
    }

    public created(res: express.Response) {
        return res.sendStatus(201);
    }

    public clientError(res: express.Response, message?: string) {
        return BaseController.jsonResponse(res, 400, message ? message : "Unauthorized");
    }

    public unauthorized(res: express.Response, message?: string) {
        return BaseController.jsonResponse(res, 401, message ? message : "Unauthorized");
    }
    public forbidden(res: express.Response, message?: string) {
        return BaseController.jsonResponse(res, 403, message ? message : "Forbidden");
    }

    public notFound(res: express.Response, message?: string) {
        return BaseController.jsonResponse(res, 404, message ? message : "Not found");
    }

    public conflict(res: express.Response, message?: string) {
        return BaseController.jsonResponse(res, 409, message ? message : "Conflict");
    }

    public internalError(res: express.Response, error: Error | string) {
        console.log(error);
        return res.status(500).json({
            message: error.toString()
        });
    }
}