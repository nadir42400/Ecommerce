// import
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const session = require("express-session");
const port = process.env.PORT || 4242;

// import route
const userRoute = require("../server/routes/user");
const authRoute = require("../server/routes/auth");
const productRoute = require("../server/routes/article");
const cartRoute = require("../server/routes/cart");
const orderRoute = require("../server/routes/order");
const stripe = require("../server/routes/stripe");

// database connexion
const connection = require("./database/database");
connection();

// middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true },
    })
);

// ------- LOGOUT ---------
// app.get('/logout', function (req, res) {
//     if (req.session.email) {
//         req.session.destroy();
//     };
//     console.log('Vous etes out !');
// });

// route
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/stripe", stripe);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
