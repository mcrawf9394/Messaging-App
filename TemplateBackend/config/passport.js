const User = require('../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ACCESS_SECRET,
}
passport.use('jwt', new JwtStrategy(opts, function (jwt_payload, done) {
    try { User.findOne({id: jwt_payload.sub})
        .then(function (user, err) { 
            if (err) {
                return done(err, false)
            }
            if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
    })} catch (err) {
        return done(err)
    }
}))