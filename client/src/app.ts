import express from "express";
import chalk from "chalk";
import mongoose from "mongoose";
import bluebird from "bluebird";
import routes from "./routes";
import initializeMiddlewares from "./initializeMiddlewares";

const log = console.log;
mongoose.Promise = bluebird;

class App {
    public app: express.Express;
    constructor() {
        const app = express();
        this.app = app;
        initializeMiddlewares(app);
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        routes(this.app);
    }

    public listen(port: number) {
        this.app.listen(port, () => {
            const env: string = this.app.get("env");
            const url: string = `http://localhost:${port}`;
            const message: string = `App is running at ${chalk.green.underline.bold(url)} in ${chalk.green(env)} mode`;
            log(message);
            log(`Press ${chalk.red.underline("CTRL-C")} to stop\n`);
        });
    }
}

export default App;
