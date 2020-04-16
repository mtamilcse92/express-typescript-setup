
import { Request, Response, NextFunction, Express } from "express";
import compression from "compression"; 
import errorHandler from "errorhandler";
import bodyParser from "body-parser";
import lusca from "lusca";
import flash from "express-flash";
import passport from "passport";

export default (app: Express): void => {
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(passport.initialize());
    app.use(errorHandler());
    app.use(passport.session());
    app.use(flash());
    app.use(lusca.xframe("SAMEORIGIN"));
    app.use(lusca.xssProtection(true));
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.locals.user = req.user;
        next();
    });
};