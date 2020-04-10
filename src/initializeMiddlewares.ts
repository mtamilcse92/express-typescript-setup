
import { Request, Response, NextFunction, Express } from "express";
import compression from "compression"; 
import session from "express-session";
import errorHandler from "errorhandler";
import bodyParser from "body-parser";
import lusca from "lusca";
import mongo from "connect-mongo";
import flash from "express-flash";
import passport from "passport";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";

const mongoUrl: string = MONGODB_URI;
const MongoStore = mongo(session);

const sessionConfig = {
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
        url: mongoUrl,
        autoReconnect: true
    })
};

export default (app: Express): void => {
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session(sessionConfig));
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