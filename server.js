//require modules

let express = require("express");

let bodyParser = require("body-parser");

var http = require("http");

let mysql = require("mysql");

let cors = require("cors");

require("dotenv").config();

var app = express();

app.use(bodyParser.json());

app.use(express.json());

var path = require("path");

app.use(bodyParser.urlencoded({ extended: false }));

var cookieParser = require("cookie-parser");
app.use(cookieParser(process.env.COOKIE_SECRET));

const session = require("express-session");
let { connection, sessionStore } = require("./db.js");

app.use(
  session({
    sessionname: "uptopointrta",
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: true,
    store: sessionStore,
    cookie: {
      maxAge: 3600000 * 24 * 365 * 999,
      httpOnly: true,
      sameSite: true,
      signed: true,
      path: "/",
    },
  })
);

app.use((req, res, next) => {
  res.setHeader("X-XSS-Protection", '1;mode="block');
  res.setHeader("X-Frame-Options", "BLOCK");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});
app.use((req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    let capchar = "ABCDEFGHIJKLMOPQRSTUVWXYZ";
    let smallchar = capchar.toLowerCase();
    let char = smallchar + capchar;
    let number = "0123456789";
    let string = char + number;
    let id = "";
    for (i = 0; i < 10; i++) {
      id += string.charAt(Math.floor(Math.random() * string.length));
    }
    req.session.user = id;
    res.status(102).cookie("user_id", id, {
      httpOnly: true,
      sameSite: true,
      path: "/",
      signed: true,
      expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365 * 999),
    });
    next();
  }
});

var options = {
  dotfiles: "ignore",
  etag: false,
  index: false,
  maxAge: "1d",
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set("X-XSS-Protection", "1;mode=block");
  },
};
app.use(express.static("public", options));

var corsOptions = {
  origin: process.env.ORIGIN,
  optionSuccessstatus: 200,
  withcredentails: true,
};

app.use(cors(corsOptions));

require("dotenv").config();

app.use(express.static(path.join(__dirname, "public")));

app.use(express.static("public/uploadimages"));

//CONNECTION TO THE DATABASE

connection.connect(function (err) {
  if (!err) {
    console.log("ESTABLISHED THE CONNECTION :DATABASE IS CONNECTED");
  } else {
    console.log(err);
    console.log("CONNECTION FAILED:DATABASE NOT CONNECTED");
  }
});

app.use("/api", express.static("public/uploadimages"));

//CALL ROUTES
const department = require("./api/department.js"); //call for vegeratrain and non vegetrain

app.use("/api/app/department", department);

const category = require("./api/categories"); //call catagories table

app.use("/api/app/categories", category);

const marketingcoupons = require("./api/marketingcoupons"); //call marketing coupons

app.use("/api/app/marketingcoupons", marketingcoupons);

const location = require("./api/location"); //call location table

app.use("/api/app/location", location);

const orders = require("./api/orders"); //call orders table

app.use("/api/app/orders", orders);

const app1 = require("./api/pagelogin"); //call for login

app.use("/app/pagelogin", app1);

const checkout = require("./api/checkout.js"); //check out

app.use("/checkout", checkout);

const orderdetails = require("./api/orderdetails"); //call for orderdetails

app.use("/api/order", orderdetails);

const cancel = require("./api/cancel.js"); //call for cancel order

app.use("/api/cancel", cancel);

const notification = require("./api/notification.js"); //call for notification table

app.use("/api/notification", notification);

const userRouter = require("./users/user.router"); //call for forgetpassword

app.use("/api/users", userRouter);

const refresh = require("./refresh/refreshtoken"); //call for login ,token,token validation

app.use("/api/refresh", refresh);

const img = require("./api/menu"); //call for Menu

app.use("/api/app/menu", img);

const items = require("./api/items"); //call for items

app.use("/api/items", items);

const customers = require("./api/customer.js");

app.use("/api/customers", customers);

const contactinfo = require("./api/contactinfo"); //call contact information

app.use("/api/contactinfo", contactinfo);

const logo = require("./api/logo");
const { Console } = require("console");
const { name } = require("ejs");
const { signedCookie } = require("cookie-parser");
const { sign } = require("crypto");
const { strict } = require("assert");
app.use("/api/logo", logo);

const support = require("./api/support.js"); //call for support table

app.use("/api/support", support);

const supportcontact = require("./api/supportcontact"); //call for support contact

app.use("/api/supportcontact", supportcontact);

const staff = require("./api/staff.js");

app.use("/api/staff", staff);

const status = require("./api/status");
app.use("/api/status", status);

const nodemailer = require("nodemailer");

var port = parseInt(process.env.PORT);

app.listen(port, function (error) {
  if (error) throw error;
  console.log(`SERVER CONNECTION SUCCESSFULLY ON  PORT ${port}`);
});
