const {Schema, model} = require('mongoose')
const ChatRoom = new Schema({
    users: {type: Array, required: true},
    name: {type: String, required: true},
    messages: {type: Array, required: true}
})
module.exports = model("ChatRooms", ChatRoom)