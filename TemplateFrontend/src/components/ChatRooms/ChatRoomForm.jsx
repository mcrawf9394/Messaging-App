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
            <Form>
                <label htmlFor="title">Name of Chat Room</label>
                <input id="title" value={title} onChange={e => setTitle(e.target.value)} type="text" required/>
                <button onClick={async (click) => {
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