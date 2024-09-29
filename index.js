import { config } from "dotenv";
import http from "http";
import { app } from "./app.js";
import { swaggerServe, swaggerSetup } from "./swagger.js";
import { database } from "./src/config/db.js";
database()
config();
app.use("/api", swaggerServe, swaggerSetup);
let port = process.env.PORT || 8080;
http
  .createServer(app)
  .listen(port, () => console.log("Server listening on port: " + port));
