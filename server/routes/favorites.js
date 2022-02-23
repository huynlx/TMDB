var express = require('express');
var router = express.Router();
const FavoriteListModel = require('../Model/FavoriteList');

//check authenticate("jwt") ở app.js luôn

router.get('/', function (req, res, next) { //lấy data theo ObjectId của user
    console.log(req.user);
    FavoriteListModel.find({ userId: req.user.id }).then((data) => {
        res.status(200).send({ favoritelist: data });
    }).catch((err) => {
        res.status(400).send(err);
    })
});

router.post('/add', function (req, res, next) {
    const userId = req.user.id; //chính là "_id" trong mongo (xem trong FavoriteList Model)
    const movie = req.body.movie;
    FavoriteListModel.findOne({ userId, id: movie.id }).then((findMovie) => {
        if (findMovie) {
            res.status(400).send({ message: "added" })
        } else {
            const newMovie = new FavoriteListModel({
                userId,
                ...movie
            });
            newMovie.save((err, data) => { //data là dữ liệu đẩy vào
                if (err) {
                    res.status(400).send({ message: err })
                } else {
                    res.status(200).send(data)
                }
            })
        }
    }).catch((err) => {
        res.status(400).send(err);
    })
});

router.post('/remove', function (req, res, next) {
    const userId = req.user.id; //chính là "_id" trong mongo (xem trong FavoriteList Model)
    const movie = req.body;
    FavoriteListModel.findOneAndDelete({ userId, id: movie.id }).then((findMovie) => {
        res.status(200).send(findMovie);
    }).catch((err) => { //phải lỗi mới chạy vào
        res.status(400).send(err);
    })
});

module.exports = router;
