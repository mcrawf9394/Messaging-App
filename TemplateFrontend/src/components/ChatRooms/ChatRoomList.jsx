import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import Info from '../info'
function ChatRoomList () {
    const navigate = useNavigate()
    const [chatRooms, setChatRooms] = useState([])
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
    return <>
        {chatRooms.map(option => {
            return <button onClick={ click => {
                click.preventDefault()
                navigate(`/chatrooms/${option.id}`)
            }}>
                {option.name}
            </button>
        })}
    </>
}
export default ChatRoomList