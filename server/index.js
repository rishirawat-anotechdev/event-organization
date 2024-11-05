import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import routes from "./routes/routes.js";
import bodyParser from "body-parser";
import { connectDB } from "./db/db.js";
import http from "http";
import cluster from "cluster";
import os from "os";
import fileUpload from "express-fileupload";
import cors from "cors"; // Import CORS

// Load environment variables from .env file
dotenv.config();

const numCPUs = os.cpus().length; // Get the number of CPU cores

if (cluster.isPrimary) {
  // Master process
  console.log(`Master ${process.pid} is running`);

  // Fork workers (one for each CPU core)
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // If a worker dies, restart it
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });

} else {
  // Worker processes (these will run the server)
  const app = express();

  // Enable CORS for requests from localhost:3000
  app.use(cors({
    origin: ["https://event-organization-tm99.onrender.com", "http://localhost:3000"],
    credentials: true, 
  }));

  // Middleware for cookies and parsing
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(fileUpload());

  // Middleware for parsing application/json
  app.use(express.json());

  // Connect to the database (only once per worker)
  connectDB();

  // Routes
  app.use("/api/v1", routes);

  // Start the server and listen on the specified port
  const port = process.env.PORT || 4000;
  const server = http.createServer(app);

  server.listen(port, () => {
    console.log(`Worker ${process.pid} is running on port ${port}`);
  });
}
