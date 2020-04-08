import App from "./app";

const app = new App();
const port: number = Number(process.env.PORT || 3000);

app.listen(port);

export default app;
