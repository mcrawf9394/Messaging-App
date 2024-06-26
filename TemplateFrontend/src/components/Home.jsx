import { useState } from "react"
import Element from './Element.jsx'
function Home () {
    const [clicked, setClicked] = useState(false)
    const [chatRooms, setChatRooms] = useState(["option1", "option2","option3"])
    if (!localStorage.getItem('name')) {
        return <>
        
        </>
    } else {
        return <>
            <nav className="grid grid-cols-2">
                <h1>Hello {localStorage.getItem('name')}!</h1>
                <button onClick={click => {
                    click.preventDefault()
                    if (clicked === false) {
                        setClicked(true)
                    } else {
                        setClicked(false)
                    }
                }}>{localStorage.getItem('name')}'s Chat Rooms</button>
            </nav>
            <Element clicked={clicked} chatRooms={chatRooms}/>
            <div className="">
                <h2>This is some Information that I should type out later</h2>
                <button>Create Chat Room</button>
            </div>
        </>
    }
}
export default Home