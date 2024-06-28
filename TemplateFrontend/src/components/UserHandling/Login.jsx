import { useState } from "react"
import { Form, useNavigate } from "react-router-dom"
import Info from '../info'
function Login () {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    return <div className="bg-blue-600">
        <Form className="w-10/12 mx-auto h-screen bg-blue-400 grid grid-rows-8">
            <label className="ml-4 text-white self-end text-2xl" htmlFor="username">Username</label>
            <input className="h-10 row-span-2 bg-white ml-8 w-11/12 border-black border-4" id="username" value={username} onChange={e => {setUsername(e.target.value)}} type="text" required/>
            <label className="ml-4 text-white self-end text-2xl" htmlFor="password">Password</label>
            <input className="h-10 row-span-2 bg-white ml-8 w-11/12 border-black border-4" id="password" value={password} onChange={e => {setPassword(e.target.value)}} type="text" required/>
            <button className="text-white text-3xl self-start justify-self-center  h-20 w-40 transition duration-300 ease-in-out border-4 border-black border-solid hover:scale-125 hover:bg-black hover:text-white" onClick={async (click) => {
                click.preventDefault()
                try {
                    const request = await fetch(Info + '/users/login', {
                        mode: 'cors',
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            "username": username,
                            "password": password
                        })
                    })
                    const response = await request.json()
                    if (response.error) {
                        console.log(response.error)
                    } else {
                        localStorage.setItem("token", response.token)
                        localStorage.setItem("name", response.name)
                        navigate('/home')
                    }
                } catch (err) {
                    console.log(err)
                }
                navigate('/home')
            }}>Submit</button>
        </Form>
    </div>    
}
export default Login