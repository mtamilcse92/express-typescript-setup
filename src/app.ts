import express from "express";
import chalk from "chalk";
import mongoose from "mongoose";
import bluebird from "bluebird";
import routes from "./routes";
import initializeMiddlewares from "./initializeMiddlewares";
import { MONGODB_URI } from "./util/secrets";
import { mongoConnectionFailed } from "./constants/messags";

const log = console.log;
mongoose.Promise = bluebird;

class App {
    public app: express.Express;
    constructor() {
        const app = express();
        this.app = app;
        this.connectMongo();
        initializeMiddlewares(app);
    }

    private async connectMongo() {
        try {
            await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
        } catch (err) {
            log(`${chalk.red(mongoConnectionFailed)} ${err}`);
            process.exit();
        }

    }

    public listen(port: number) {
        this.app.listen(port, () => {
            const env = this.app.get("env");
            const url = `http://localhost:${port}`;
            const message = `App is running at ${chalk.green.underline.bold(url)} in ${chalk.green(env)} mode`;
            log(message);
            log(`Press ${chalk.red.underline("CTRL-C")} to stop\n`);
            routes(this.app);
        });
    }
}

export default App;
