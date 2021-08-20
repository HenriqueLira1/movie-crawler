import express from "express";
import routes from "./routes";

const app = express();
app.use(routes);

const port = 8080;
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
