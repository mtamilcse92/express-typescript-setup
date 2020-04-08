import { Express, Request, Response } from "express";
import {loginValidator, userValidator,  validate} from "./requestValidation";

// Controllers

import UserController from "./controllers/User";
// Api path's
const apiVersion = "/api/v1/";
const ping = "ping";
const login = "login";
const user = "users";

export default (app: Express) => {
    // Check the service
    app.get(`${apiVersion}${ping}`, (req: Request, res: Response) => res.send("Server is Runnung..."));

    // User Flow
    app.get(`${apiVersion}${user}`, UserController.getUser);
    app.post(`${apiVersion}${user}`, userValidator(), validate,  UserController.createUser);
    app.patch(`${apiVersion}${user}/:id`, userValidator(), validate,  UserController.updateUser);
    app.delete(`${apiVersion}${user}/:id`,  UserController.deleteUser);

    app.post(`${apiVersion}${login}`, loginValidator(), validate, (req: Request, res: Response) => res.send("Server is Runnung..."));
}; 