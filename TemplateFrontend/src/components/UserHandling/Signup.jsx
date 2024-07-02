import { useState } from "react"
import { Form, useNavigate } from "react-router-dom"
import Info from '../info'
function Signup () {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    return <div className="bg-blue-600">
        <Form className="w-10/12 mx-auto h-screen bg-blue-400 grid">
            <label className="ml-4 text-white self-end text-2xl" htmlFor="username">Username</label>
            <input className="h-10 row-span-2 bg-white ml-4 w-11/12 border-black border-4 sm:ml-8" id="username" value={username} onChange={e => setUsername(e.target.value)} type="text" required/>
            <label className="ml-4 text-white self-end text-2xl" htmlFor="password">Password</label>
            <input className="h-10 row-span-2 bg-white ml-4 w-11/12 border-black border-4 sm:ml-8" id="password" value={password} onChange={e => setPassword(e.target.value)} type="text" required/>
            <label className="ml-4 text-white self-end text-2xl" htmlFor="confirm">Confirm Password</label>
            <input className="h-10 row-span-2 bg-white ml-4 w-11/12 border-black border-4 sm:ml-8" id="confirm" value={confirm} onChange={e => setConfirm(e.target.value)} type="text" required/>
            <button className="text-white text-3xl self-start justify-self-center  h-20 w-40 transition duration-300 ease-in-out border-4 border-black border-solid hover:scale-125 hover:bg-black hover:text-white" onClick={async (click) => {
                click.preventDefault()
                try {
                    const request = await fetch(Info + '/users', {
                        mode: 'cors',
                        method: 'POST',
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            "username": username,
                            "password": password,
                            "confirm": confirm
                        })
                    })
                    const response = await request.json()
                    if (response.error) {
                        console.log(response.error)
                    } else {
                        navigate('/login')
                    }
                } catch (err) {
                    console.log(err)
                }
            }}>Submit</button>
        </Form>
    </div>
}
export default Signup