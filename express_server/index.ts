import express, { Request, Response } from "express";
import cors from "cors";
import { router as apiRoutes } from "./routes";
// import sequelize connectToDatabase function from databse.ts
import { connectToDatabase } from "./database";

// Create express app
const app = express();
// Set port
const PORT = 3000;

// Use CORS
app.use(cors());
// Allows for parsing json input for POST requests
app.use(express.json());
// Set api routes from routes.ts
app.use("/api", apiRoutes);

// Set default endpoint behavior
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server running." });
});

// Console log is server ran successfully
app.listen(PORT, () => {
  console.log(`Server is running at http::/localhost:${PORT}`);
  connectToDatabase();
});
