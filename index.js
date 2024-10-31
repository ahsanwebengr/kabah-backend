import { config } from "dotenv";
import cluster from "cluster";
import http from "http";
import os from "os";
import { app } from "./app.js";
import { swaggerServe, swaggerSetup } from "./swagger.js";
import { database } from "./src/config/db.js";
database();
config();
app.use("/api", swaggerServe, swaggerSetup);
let port = process.env.PORT || 8080;

//  cluster implementation
console.log("Hello World!");

console.log(cluster.isMaster);
if (cluster.isMaster) {
  
  // Fork workers.
  for (let i = 0; i < os.cpus().length; i++) {
    console.log(`Master ${process.pid} is running`);
    cluster.fork();
  }
} else {
  http
    .createServer(app)
    .listen(port, () => console.log("Server listening on port: " + port));
    console.log(`Master ${process.pid} is running`);
}
