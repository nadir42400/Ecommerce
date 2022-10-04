const mongoose = require('mongoose');
const dotenv = require("dotenv")

module.exports = () => {

    // appel des param du .env
    dotenv.config();

    try {

        // try la connexion
        mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to database successfully");

    } catch (error) {

        console.log(error);
        console.log("could not connect to database!");
    };
};