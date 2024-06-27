var express = require('express')
var router = express.Router()
const userController = require('../controllers/userController')
const chatRoomController = require('../controllers/chatRoomController')
// User routes
router.get('/users', userController.getAllUsers)
router.get('/users/:userId', userController.getSingleUser)
router.post('/users', userController.createUser)
router.post('/users/login', userController.loginUser)
router.delete('/users/:userId', userController.deleteUser)
// Chat Room routes
router.get('/chatrooms', chatRoomController.getAllChatRooms)
router.get('/chatrooms/:chatRoomId', chatRoomController.getSingleChatRoom)
router.post('/chatrooms', chatRoomController.addChatRoom)
router.delete('/chatrooms/:chatRoomId', chatRoomController.deleteChatRoom)
module.exports = router