const createError = require("http-errors");
const express = require("express");
const dotenv = require("dotenv");
const path = require('path');
const logger = require('morgan');
const mongoose = require("mongoose");

dotenv.config();

const indexRouter = require("./routes/index");
const userRouter = require("./api/Setting/user/user.route");
const paymentRouter = require("./api/Setting/payment/payment.route");
const companyRouter = require("./api/Setting/company/company.route");
const itemsCategoriesRouter = require("./api/Setting/itemsCategories/itemsCategories.route");
const itemsRouter = require("./api/Setting/items/items.route");
const ordersRouter = require("./api/Setting/orders/orders.route");

const app = express();

app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/payment", paymentRouter);
app.use("/company", companyRouter);
app.use("/itemsCategories", itemsCategoriesRouter);
app.use("/items", itemsRouter);
app.use("/orders", ordersRouter);

mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
