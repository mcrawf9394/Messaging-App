import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Info from './info.js'
function App() {
  const navigate = useNavigate()
  useEffect(() => {
    const isAuth = async () => {
      try {
        const request = await fetch(Info + '/users/check', {
          mode: 'cors',
          method: 'GET',
          headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        })
        if (request.status === 200) {
          navigate('/home')
        }
      } catch {
        console.log("There is a server error")
      }
    }
    isAuth()
  }, [])
  return <div className='h-screen bg-blue-400'>
      <h1 className='sm:h-20 sticky top-0 text-center text-xl bg-blue-600 text-white mb-10 sm:mb-0 sm:text-6xl'>Messaging App</h1>
      <div className='w-10/12 h-4/5 mx-auto bg-white mt-2 sm:mt-5 rounded-lg'>
        <h2 className='sm:text-3xl sm:mb-10 text-center mx-5 border-b-4 border-solid border-black pt-4 pb-4'>This is a messaging app built for the Odin Project</h2>
        <p className='text-sm md:text-base my-10 indent-6 mx-10'>On this application, you can create an account and send messages to other users. This project was made with the MERN stack and uses the passport strategy for jsonwebtokens to authenticate users. The project also uses socket.io to create a better user experience of the chatrooms. Socket.io does the heavy lifting when it comes to creating websockets so that the user does not constantly have to refresh the page to view new messages.</p>
        <div className='w-full inline-flex justify-around mt-5 sm:mt-28'>
          <button className='md:h-20 md:w-40 transition duration-300 ease-in-out border-4 border-black border-solid sm:hover:scale-125 hover:bg-black hover:text-white' onClick={click => {
            click.preventDefault()
            navigate('/login')
          }}>Login</button>
          <button className='sm:h-20 sm:w-40 transition duration-300 ease-in-out border-4 border-black border-solid sm:hover:scale-125 hover:bg-black hover:text-white' onClick={click => {
            click.preventDefault()
            navigate('/signup')
          }}>Create Account</button>
        </div>
      </div>
      <footer className='sticky bottom-0 text-center text-white sm:text-lg'>Created by Sam Crawford - <a target="_blank" href="https://icons8.com/icon/jOjH1Mt48Fp1/chat-message">Message</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a></footer>
    </div>
}

export default App
