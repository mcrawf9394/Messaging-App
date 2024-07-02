import { useState } from "react"
import { useNavigate, Form } from 'react-router-dom'
import Info from '../info'
function ChatRoomForm (props) {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    if (props.clicked === false) {
        return <>
        
        </>
    } else {
        return <>
            <Form className="mt-40">
                <label htmlFor="title" className="mr-4">Name of Chat Room</label>
                <input className="mr-4" id="title" value={title} onChange={e => setTitle(e.target.value)} type="text" required/>
                <button className="h-8 my-8 transition ease-in-out delay-150 border-4 border-solid border-black hover:text-white hover:bg-black w-1/12 rounded-lg" onClick={async (click) => {
                    click.preventDefault()
                    try {
                        const request = await fetch(Info + '/chatrooms', {
                            mode: 'cors',
                            method:'POST',
                            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`},
                            body: JSON.stringify({
                                "title": title
                            })
                        })
                        const response = await request.json()
                        if (response.error) {
                            console.log(response.error)
                        } else {
                            navigate(`/chatroom/${response.id}`)
                        }
                    } catch {
                        console.log("there was an error reaching the server")
                    }
                }}>Create</button>
            </Form>
        </>
    }
}
export default ChatRoomForm