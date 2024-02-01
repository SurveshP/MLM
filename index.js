import express from "express";
import dotenv from "dotenv";
import path from "path";
import adminRouter from "./routes/admin.route.js";
import { fileURLToPath } from "url";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import categoryRouter from "./routes/category.route.js";
import orderRouter from "./routes/order.route.js";
import Connection from "./database/db.js";

/********************************************/
const app = express();
dotenv.config();
const PORT = 8000 || process.env.PORT;

/*****************MIDDLEWARES*****************/

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const __filename = fileURLToPath(import.meta.url); // Get directory name using import.meta.url
const __dirname = path.dirname(__filename); // Get directory name using import.meta.url
app.use("/", express.static(__dirname + "/public"));

/*******************ROUTES******************/
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/order", orderRouter);

/*******************ROUTES******************/

const MONGODB_URL = process.env.MONGODB_URL;

Connection(MONGODB_URL);

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error while listening on PORT: ${PORT}`);
  } else {
    console.log(`Server is listening on PORT: ${PORT}`);
  }
});

/***************************************/
