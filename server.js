// DEPENDENCIES
import chalk from "chalk";
import morgan from "morgan";

import express from "express";
const app = express();
const port = 3000

import testRoute from "./routes/test.route.js"

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.get("/", (req, res) => {
    res.send("Server is live");
})

app.use('/api/v1/test',testRoute)

app.listen(port, () => {
    console.log("Server live on", chalk.bgWhiteBright(`http://localhost:3000`))
})