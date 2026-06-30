import express from "express";
const app = express();
const port = 3000

import testRoute from "./routes/test.route.js"

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is live");
})

app.use('/api/v1/test',testRoute)

app.listen(port, () => {
    console.log("server live on port 3000")
})