const mongoose = require('mongoose');

const articles = new mongoose.Schema(
    {
        full_name: {type: String, require: true},
        details: {type: String, require: true},
        price: {type: Number, require: true},
        stock: {type: Number, require: true},
        marque: {type: String, require: true},
        image: {type: String, require: true},
        categories: {type: Array},
        id_reviews: {type: mongoose.Types.ObjectId, ref: "reviews"},
        clickPoint: {type: Number},
        searchPoint: {type: Number}
    },
    {collection: 'articles'}
);

const Articles = mongoose.model("articleData", articles);

module.exports = Articles;