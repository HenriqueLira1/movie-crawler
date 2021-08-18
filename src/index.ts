import express from "express";
import { testCrawler } from "./test";

const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get("/", async (req, res) => {
    const bla = await testCrawler();

    res.send(bla);
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
