const asyncHandler = require('express-async-handler')
const {body, validationResult} = require('express-validator')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const ChatRoom = require('../models/chatRoom')
const Messages = require('../models/message')

require('dotenv').config()
exports.addNewMessage = asyncHandler(async (req, res, next) => {
    const newMessage = new Messages ({
            chatRoom: req.body.chatRoom,
            message: req.body.message,
            user: req.body.name,
            date: new Date()
        })
    try {
        await newMessage.save()
        res.status(200).json({msg: 'added successfully'})
    } catch {
        res.status(500)
    }
})
exports.getUsersChatRoom = [
    passport.authenticate('jwt', {session: false}),
    asyncHandler(async (req, res, next) => {
        let token = req.headers.authorization.split(' ')[1]
        let currentUser = jwt.decode(token)
        try {
            const ChatRooms = await ChatRoom.find({users: currentUser.id}).sort({_id: 1}).exec()
            const ChatRoomNames = []
            const ChatRoomIds = []
            for (i = 0; i < ChatRooms.length; i++) {
                ChatRoomNames.push(ChatRooms[i].name)
                ChatRoomIds.push(ChatRooms[i]._id)
            }
            res.status(200).json({names: ChatRoomNames, ids: ChatRoomIds})
        } catch {
            res.status(500)
        }
    })
]
exports.getAllChatRooms = [
    passport.authenticate('jwt', {session: false}),
    asyncHandler(async (req, res, next) => {
        try {
            const ChatRooms = await ChatRoom.find().sort({_id: 1}).exec()
            const ChatRoomNames = []
            const ChatRoomIds = []
            for (i = 0; i < ChatRooms.length; i++) {
                ChatRoomNames.push(ChatRooms[i].name)
                ChatRoomIds.push(ChatRooms[i]._id)
            }
            res.status(200).json({names: ChatRoomNames, ids: ChatRoomIds})
        } catch {
            res.status(500)
        }
    })
]
exports.getSingleChatRoom = [
    passport.authenticate('jwt', {session: false}),
    asyncHandler(async (req, res, next) => {
        let token = req.headers.authorization.split(' ')[1]
        let currentUser = jwt.decode(token)
        try {   
            const chatRoom = await ChatRoom.findById(req.params.chatRoomId).exec()
            let allMessages = await Messages.find({chatRoom: req.params.chatRoomId}).sort({date: 1}).exec()
            if (chatRoom.users.indexOf(currentUser.id) === -1) {
                await ChatRoom.findByIdAndUpdate(chatRoom._id, {$push: {users: currentUser.id}})
            }
            res.status(200).json({chatRoom: chatRoom.name, messages: allMessages})
        } catch (err) {
            res.status(500)
        }
    })
]
exports.addChatRoom = [
    passport.authenticate('jwt', {session: false}),
    body("title")
        .trim()
        .isLength({min: 1, max: 20})
        .escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.json({error: errors.array()})
        } else {
            let token = req.headers.authorization.split(' ')[1]
            let currentUser = jwt.decode(token)
            const newChatRoom = new ChatRoom({
                users: [currentUser.id],
                name: req.body.title,
                messages: []
            })
            try {
                await newChatRoom.save()
                await User.findByIdAndUpdate(currentUser.id, {$push: { chatRooms: newChatRoom._id}}).exec()
                res.status(200).json({id: newChatRoom._id})
            } catch  {
                res.status(500)
            }
        }
    })
]
exports.deleteChatRoom = [
    passport.authenticate('jwt', {session: false}),
    asyncHandler(async (req, res, next) => {
        try {
            const chatRoom = await ChatRoom.findById(req.params.chatRoomId)
            if (chatRoom.users.length > 2) {
                const token = req.headers.authorization.split(' ')[1]
                const user = jwt.decode(token)
                var index = chatRoom.users.findIndex(user.id)
                if (index === -1) {
                    console.log('unauthorized')
                }
                else {
                    chatRoom.users.splice(index, 1)
                    await ChatRoom.findByIdAndUpdate(req.params.chatRoomId, {users:  chatRoom.users})
                }
            } else {
                await ChatRoom.findByIdAndDelete(req.params.chatRoomId)
            }
            res.status(200)
        } catch (err) {
            res.status(500)
        }
    })
]
