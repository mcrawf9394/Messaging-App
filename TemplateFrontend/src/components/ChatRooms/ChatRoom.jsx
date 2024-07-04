import { useState, useEffect} from 'react'
import { useNavigate, useParams, Form} from 'react-router-dom'
import Info from '../info'
import io from 'socket.io-client'
import { v4 as uuidV4} from 'uuid'
function ChatRoom () {
    const navigate = useNavigate()
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
    return <div className='w-11/12 sm:w-8/12 mx-auto bg-blue-400 h-screen'>
        <h1 className='text-white text-4xl text-center mb-2 pb-3 border-b-4 border-black border-solid'>{name}</h1>
        <div className='overflow-scroll h-4/5 w-11/12 mx-auto grid grid-cols-1 gap-y-3'>
            {messages.map(val => {
                if (val.user === localStorage.getItem('name')) {
                    return <p key={uuidV4()} className='justify-self-end py-5 px-5 text-right text-white bg-blue-600 min-w-20 w-fit max-w-lg rounded-xl'>{val.user} - {val.message}</p>
                } else {
                    return <p key={uuidV4()} className='text-left py-5 px-5 text-white bg-blue-600 min-w-20 w-fit max-w-lg rounded-xl'>{val.user} - {val.message}</p>
                }
            })}
        </div>
        <Form className='absolute bottom-0 w-11/12 sm:w-8/12 my-2 inline-flex justify-around items-center'>
            <button className='sm:h-8 my-8 transition ease-in-out delay-150 border-4 border-solid border-black hover:text-white hover:bg-black sm:w-1/12 rounded-lg' onClick={click => {
                click.preventDefault()
                navigate('/home')
            }}>Home</button>
            <input id='newmessage' value={newMessage} onChange={e => {setNewMessage(e.target.value)}} className='mx-5 h-8 w-8/12' type="text" required/>
            <button className='sm:h-8 my-8 transition ease-in-out delay-150 border-4 border-solid border-black hover:text-white hover:bg-black sm:w-1/12 rounded-lg' onClick={click => {
                click.preventDefault()
                socket.emit("send-message", params.chatRoomId, newMessage, localStorage.getItem('name'), res => {
                    console.log(res)
                })
                setNewMessage('')
                setMessages([...messages, {user: localStorage.getItem('name'), message: newMessage}])
            }}>Send</button>
        </Form>
    </div>
}
export default ChatRoom