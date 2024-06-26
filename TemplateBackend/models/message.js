const { Schema, model} = require('mongoose')
const Message = new Schema ({
    chatRoom: {type: Schema.Types.ObjectId, ref:"ChatRooms", required: true},
    user: {type: String, required: true},
    message: {type: String, required: true},
    date: {type: Date, required: true}
})
module.exports = model("Messages", Message)