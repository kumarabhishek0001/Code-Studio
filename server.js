// DEPENDENCIES
import chalk from "chalk";
import morgan from "morgan";


//EXPRESS IMPORT
import express from "express";
const app = express();
const port = 3000;

//ROUTE IMPORTS
import testRoute from "./routes/test.route.js";
import authRoute from "./routes/auth.route.js"

app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms"),
);


app.use("/api/v1/test", testRoute);
app.use("/api/v1/auth", authRoute);

app.listen(port, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("Server live on", chalk.bgWhiteBright(`http://localhost:3000`));
});
