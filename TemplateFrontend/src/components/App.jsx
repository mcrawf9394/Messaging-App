import { useNavigate } from 'react-router-dom'
function App() {
  const navigate = useNavigate()
  return <div className='h-screen bg-blue-400'>
      <h1 className='h-20 sticky top-0 text-center text-6xl bg-blue-600 text-white'>Messaging App</h1>
      <div className='w-10/12 h-4/5 mx-auto bg-white mt-5 rounded-lg'>
        <h2 className='text-3xl mb-10 text-center mx-5 border-b-4 border-solid border-black pt-4 pb-4'>This is a messaging app built for the Odin Project</h2>
        <p className='text-base my-10 indent-6 mx-10'>On this application, you can create an account and send messages to other users. This project was made with the MERN stack and uses the passport strategy for jsonwebtokens to authenticate users.</p>
        <div className='w-full inline-flex justify-around mt-28'>
          <button className='h-20 w-40 transition duration-300 ease-in-out border-4 border-black border-solid hover:scale-125 hover:bg-black hover:text-white' onClick={click => {
            click.preventDefault()
            navigate('/login')
          }}>Login</button>
          <button className='h-20 w-40 transition duration-300 ease-in-out border-4 border-black border-solid hover:scale-125 hover:bg-black hover:text-white' onClick={click => {
            click.preventDefault()
            navigate('/signup')
          }}>Create Account</button>
        </div>
      </div>
      <footer className='sticky bottom-0 text-center text-white text-lg'>Sam Crawford</footer>
    </div>
}

export default App
