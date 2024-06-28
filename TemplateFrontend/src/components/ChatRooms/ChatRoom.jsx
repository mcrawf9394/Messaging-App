import { useState, useEffect} from 'react'
import { useNavigate, useParams, Form} from 'react-router-dom'
import Info from '../info'
import io from 'socket.io-client'
function ChatRoom () {
    const params = useParams()
    const socket = io('http://localhost:3000')
    const [name, setName] = useState("loading")
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    useEffect(() => {
        socket.emit("join-chat-room", params.chatRoomId, res => {
            console.log(res)
        })
        const getInfo = async () => {
            try {
                const request = await fetch(Info +`/chatrooms/${params.chatRoomId}`, {
                    mode: 'cors',
                    method: 'GET',
                    headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
                })
                const response = await request.json()
                setName(response.chatRoom)
                setMessages(response.messages)
            } catch (err) {
                console.log(err)
            }
        }
        getInfo()
    }, [])
    socket.on("receive-message", (message) => {
        setMessages(message)
    })
    return <>
        <h1>{name}</h1>
        {messages.map(val => {
            return <button>{val.user} - {val.message}</button>
        })}
        <Form>
            <input value={newMessage} onChange={e => {setNewMessage(e.target.value)}} className='' type="text" required/>
            <button onClick={click => {
                click.preventDefault()
                socket.emit("send-message", params.chatRoomId, newMessage, localStorage.getItem('name'), res => {
                    console.log(res)
                })
                setMessages([...messages, {user: localStorage.getItem('name'), message: newMessage}])
            }}>Send</button>
        </Form>
    </>
}
export default ChatRoom