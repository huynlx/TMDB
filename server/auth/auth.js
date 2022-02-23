const UserModel = require("../Model/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

passport.use( //strategy local - xác thực tài khoản local
    new LocalStrategy((username, password, done) => {
        // Match user
        UserModel.findOne({
            username
        }).then(user => { //user trả về true or false
            if (!user) { // Đéo tìm thấy email => pass to error (info)
                return done(null, false, { user: 'That username is not registered' });
            }
            // Nếu tìm thấy
            // Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user); //thanh cong
                } else {//pass to error (info)
                    return done(null, false, { password: 'Password incorrect' });
                }
            });
        });
    })
);

passport.use( //strategy jwt => bảo vệ router
    //lấy token từ localStorage ra set vào header (ko có token => false => đéo cho vào)
    new JwtStrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        (jwt_payload, done) => {
            UserModel.findOne({ _id: jwt_payload.id })
                .then((user) => {
                    if (user) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                })
                .catch((err) => {//sai token hoặc ko có
                    return done(err, false);
                });
        }
    )
);