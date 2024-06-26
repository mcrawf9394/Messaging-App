const { Schema, model } = require('mongoose')
const User = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    chatRooms: {type: Array, required: true}
})
module.exports = model("Users", User)