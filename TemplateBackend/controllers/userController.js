const asyncHandler = require('express-async-handler')
const {body, validationResult} = require('express-validator')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
require('dotenv').config()
exports.auth = [
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        res.status(200).json({msg: 'Authorized'})
     }
]
exports.getAllUsers = asyncHandler(async (req, res, next) => {
    try {   
        const Users = await User.find().sort({_id: 1}).exec()
        if (Users) {
            res.json({users: Users})
        } else {
            res.json({users: []})
        }
    } catch (err) {
        res.status(500)
    }
})
exports.getSingleUser = asyncHandler(async (req, res, next) => {
    try {
        const Users = await User.findById(req.params.userId).exec()
        if (Users) {
            res.json({user: Users})
        } else {
            res.status(404)
        }
    } catch (err) {
        res.status(500)
    }
})
exports.createUser = [
    body("username")
        .trim()
        .isLength({min: 1})
        .custom(async val => {
            try {
                const user = await User.findOne({username: val}) 
                if (user) {
                    throw new Error("User Already exists");
                }
            } catch (err) {
                console.log(err)
            }
        })
        .escape(),
    body("password")
        .trim()
        .isLength({min: 6, max: 20})
        .escape(),
    body("confirm")
        .trim()
        .custom((val, {req}) => {
            return val === req.body.password
        })
        .escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.json({error: errors.array()})
        }
        const salt = bcrypt.genSaltSync(10)
        const password = bcrypt.hashSync(req.body.password, salt)
        let newUser = new User({
            username: req.body.username,
            password: password,
            chatRooms: []
        })
        try {
            await newUser.save()
            res.status(200).json({success: "User successfully created"})
        } catch (err) {
            res.status(500)
        }

    })
]
exports.loginUser = [
    body("username")
        .trim()
        .isLength({min: 1})
        .escape(),
    body("password")
        .trim()
        .isLength({min: 6, max: 20})
        .escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.json({error: errors.array()})
        } else {
            try {
                const user = await User.findOne({username: req.body.username}).exec()
                if (!user) {
                    res.json({error: {"msg": "This user does not exist"}})
                } else if (!bcrypt.compareSync(req.body.password, user.password)) {
                    res.json({error: {"msg": "This password is incorrect"}})
                } else {
                    let token = jwt.sign({id: user._id}, process.env.ACCESS_SECRET, {expiresIn: '7d'})
                    res.json({token, name: user.username})
                }
            } catch (err) {
                res.status(500)
            }
        }
    })
]
exports.deleteUser = [
    passport.authenticate('jwt', {session: false}),
    asyncHandler(async (req, res, next) => {
        try {
            await User.findByIdAndDelete(req.params.userId).exec()
            res.status(200).json({success: "User deleted"})
        } catch (err) {
            res.status(500)
        }
    })
]