const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const UserModel = require('../Model/User');

router.post("/signup", (req, res) => {
  const { email, username, password } = req.body;
  UserModel.findOne({ email }).then(results => {
    if (results) {
      UserModel.findOne({ username }).then(ketqua => {
        if (ketqua) {
          res.status(400).send({ "email": "Email has already been taken", "user": "Username has already been taken" });
        } else {
          res.status(400).send({ "email": "Email has already been taken" });
        }
      })
    } else {
      UserModel.findOne({ username }).then(results2 => {
        if (results2) {
          res.status(400).send({ "user": "Username has already been taken" });
        } else {
          const newUser = new UserModel({ //tạo đối tượng từ UserModel (áp dụng ràng buộc dữ liệu)
            email,
            username,
            password
          });
          bcrypt.genSalt(10, (err, salt) => { //mã hoá password
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save().then(user => {
                // chạy tiếp lỗi thì chạy vào catch
                res.status(200).send('Successful Registration!');
              })
                //catch cho cả save() và then()
                .catch(err => res.status(400).send(err));
            })
          })
        }
      })
    }
  });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) { // lỗi gì đó éo biết
      res.status(400).send(err);
    }
    if (info !== undefined) { //sai username hoặc password
      res.status(400).send(info);
    } else { //thành công
      req.login(user, { session: false }, (err) => {
        if (err) { //có lỗi gì đó éo biết
          res.status(400).send(err);
        } else {//ko lỗi gì thì nhảy vào đây
          // tạo token khi đăng nhập thành công
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
          });
          res.status(200).json({ token, user });
        }
      });
    }
  })(req, res, next);
});

router.get( //test authentication
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).json({ user: req.user });
  }
);

router.post('/changePassword', function (req, res, next) {
  const { oldPassword, newPassword, username } = req.body;
  UserModel.findOne({ username }, (err, user) => {
    // Check if error connecting => lỗi kết nối
    if (err) {
      res.json({ success: false, message: err }); // Return error
    } else {
      // Check if user was found in database
      if (!user) {
        res.json({ message: 'User not found' }); // Return error, user was not found in db
      } else {
        // Match password
        bcrypt.compare(oldPassword, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            //thanh cong
            // res.status(200).send('Password khớp')
            bcrypt.genSalt(10, (err, salt) => { //mã hoá password
              bcrypt.hash(newPassword, salt, (err, hash) => {
                if (err) throw err;
                UserModel.findOneAndUpdate({ username }, { $set: { password: hash } }, (err, user) => {
                  if (err) {
                    res.json(err);  //check ket noi
                  } else {
                    res.status(200).send('Change Password thành công') //200 => data
                  }
                })
              })
            })
          } else {//pass to error (info)
            res.status(400).send('Wrong password'); //400 => err
          }
        });
      }
    }
  });
});

router.post('/changeProfile', function (req, res, next) {
  const { email, username, avatar } = req.body;
  console.log(req.body.avatar);
  UserModel.findOneAndUpdate({ username }, { $set: { email, avatar } }, (err, user) => {
    if (err) {
      res.json(err);  //check ket noi
    } else {
      res.status(200).send('Change Email thành công') //200 => data
    }
  })
})

module.exports = router;
