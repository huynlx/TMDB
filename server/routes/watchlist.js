var express = require('express');
var router = express.Router();
const WatchListModel = require('../Model/WatchList');

//check authenticate("jwt") ở app.js luôn

router.get('/', function (req, res, next) { //lấy data theo ObjectId của user
    console.log(req.user);
    WatchListModel.find({ userId: req.user.id }).then((data) => {
        res.status(200).send({ watchlist: data });
    }).catch((err) => {
        res.status(400).send(err);
    })
});

router.post('/add', function (req, res, next) {
    const userId = req.user.id; //chính là "_id" trong mongo (xem trong WatchList Model)
    const movie = req.body.movie;
    console.log(movie.id);
    WatchListModel.findOne({ userId, id: movie.id }).then((findMovie) => {
        if (findMovie) {
            res.status(400).send({ message: "added" })
        } else {
            const newMovie = new WatchListModel({
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
    const userId = req.user.id; //chính là "_id" trong mongo (xem trong WatchList Model)
    const movie = req.body;
    WatchListModel.findOneAndDelete({ userId, id: movie.id }).then((findMovie) => {
        console.log(findMovie);
        res.status(200).send(findMovie);
    }).catch((err) => { //phải lỗi mới chạy vào
        res.status(400).send(err);
    })
});

module.exports = router;
