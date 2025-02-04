import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import Element from './Element.jsx'
import ChatRoomForm from './ChatRooms/ChatRoomForm.jsx'
import Info from './info.js'
function Home () {
    const navigate = useNavigate()
    const [clicked, setClicked] = useState(false)
    const [chatRooms, setChatRooms] = useState([{name: 'chatroom1', id: 1}])
    const [otherClick, setOtherClick] = useState(false)
    useEffect(()=>{
        const getInfo = async () => {
            try {
                const request = await fetch(Info + '/userchatrooms', {
                    mode: 'cors',
                    method: 'GET',
                    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem('token')}`}
                })
                if (request.status === 401) {
                    localStorage.clear()
                    navigate('/')
                }
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
                    for (let i = 0; i < response.names.length; i++) {
                        arr.push(createObj(response.names[i], response.ids[i]))
                    }
                    console.log(arr)
                    setChatRooms(arr)
                }
            } catch (err) {
                console.log(err)
            }
        }
        getInfo()
    }, [])
    if (!localStorage.getItem('name')) {
        return <>
        
        </>
    } else {
        return <div className="bg-blue-600 h-screen">
            <nav className="bg-blue-400 grid grid-cols-2">
                <h1 className="text-xl sm:text-4xl self-center">Hello {localStorage.getItem('name')}!</h1>
                <button className="my-8 transition ease-in-out delay-150 hover:text-white justify-self-end" onClick={click => {
                    click.preventDefault()
                    if (clicked === false) {
                        setClicked(true)
                    } else {
                        setClicked(false)
                    }
                }}>{localStorage.getItem('name')}'s Chat Rooms</button>
            </nav>
            <Element clicked={clicked} chatRooms={chatRooms}/>
            <div className="w-10/12 mx-auto mt-20">
                <h2 className="text-center">Please sign up to use the service and access chat rooms.</h2>
                <button className="w-full border-4 border-solid border-black my-8 h-20 sm:w-52 sm:float-left sm:ml-12 transition ease-in-out hover:scale-110 hover:text-white hover:bg-black" onClick={click => {
                    click.preventDefault()
                    if (otherClick === true) {
                        setOtherClick(false)
                    } else {
                        setOtherClick(true)
                    }
                }}>Create Chat Room</button>
                <button className="w-full border-4 border-solid border-black my-8 h-20 sm:w-52 sm:float-right sm:mr-12 transition ease-in-out hover:scale-110 hover:text-white hover:bg-black" onClick={click => {
                    click.preventDefault()
                    navigate('/chatrooms')
                }}>Join Existing Chat Rooms</button>
                <ChatRoomForm clicked={otherClick} />
            </div>
        </div>
    }
}
export default Home