import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import Info from '../info'
import {v4 as uuidV4} from 'uuid'
function ChatRoomList () {
    const navigate = useNavigate()
    const [chatRooms, setChatRooms] = useState([{name: "chatroom1", id: '1'}, {name: "chatroom2", id: '2'}, {name: "chatroom3", id: '3'}])
    useEffect(() => {
        const getInfo = async () => {
            try {
                const request = await fetch(Info +'/chatrooms', {
                    mode: 'cors',
                    method: 'GET',
                    headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
                })
                const response = await request.json()
                if (response.error) {
                    console.log(response.error)
                } else {
                    const createObj = (name, id) => {
                        return {
                            name: name,
                            id: id
                        }
                    }
                    let arr = []
                    console.log(response)
                    for (let i = 0; i < response.names.length; i++) {
                        arr.push(createObj(response.names[i], response.ids[i]))
                    }
                    setChatRooms(arr)
                }
            } catch {
                console.log("Could not connect to server")
            }
        }
        getInfo()
    }, [])
    return <div className="w-10/12 mx-auto overflow-scroll grid grid-cols-1 gap-2">
        {chatRooms.map(option => {
            return <button key={uuidV4()} className="w-full h-40 bg-gray-400 hover:bg-gray-200" onClick={ click => {
                click.preventDefault()
                navigate(`/chatrooms/${option.id}`)
            }}>
                {option.name}
            </button>
        })}
    </div>
}
export default ChatRoomList