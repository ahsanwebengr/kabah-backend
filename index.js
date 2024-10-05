import { config } from "dotenv";
import http from "http";
import os from "os";
import { app } from "./app.js";
import { swaggerServe, swaggerSetup } from "./swagger.js";
import { database } from "./src/config/db.js";
database();
config();
app.use("/api", swaggerServe, swaggerSetup);
let port = process.env.PORT || 8080;

http
  .createServer(app)
  .listen(port, () => console.log("Server listening on port: " + port));

// const server = http.createServer(app);
// const PORT = process.env.PORT || 7070;
// const HOST = "0.0.0.0";

// // Start server on local network

// // Function to get the local network IP address
// const getLocalNetworkIP = () => {
//   const interfaces = os.networkInterfaces();
//   for (const name of Object.keys(interfaces)) {
//     for (const iface of interfaces[name]) {
//       if (iface.family === "IPv4" && !iface.internal) {
//         return iface.address;
//       }
//     }
//   }
//   return "localhost"; // Fallback to localhost if no network IP found
// };

// server.listen(PORT, HOST, () => {
//   const address = getLocalNetworkIP();
//   console.log(`Server listening on http://${address}:${PORT}`);
// });
