import cors from "cors";
import express from "express";
import { config } from "dotenv";
import TableRouter from "./routes/table";

// config dot env
config();

const main = async () => {
  // create app
  const app = express();

  // cors options
  const corsOptions = {
    origin: ["http://localhost:3000"],
    credentials: false,
  };

  app.use(express.json());
  app.use(cors(corsOptions));

  // use custom router for /table endpoint
  app.use("/table", TableRouter);

  // get port from dot env
  const port: number = parseInt(process.env.PORT as string, 10);

  // start server
  app.listen(port, () => {
    console.log(`App runing at http://localhost:${port}`);
  });
};

// check for errors
main().catch((err) => console.error(err));
