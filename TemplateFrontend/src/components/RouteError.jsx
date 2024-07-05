function RouteError () {
    return <>
        <h1 className="">Well, I am not sure what you are doing here!</h1>
        <p className="my-8">This page does not exist, if you got to this page by using the website normally please contact me at mjc9394@gmail.com. Otherwise, please click the link below to navigate back to the website.</p>
        <a href="/"><button className="w-full border-4 border-solid border-black my-8 h-20 sm:w-52 sm:float-left sm:ml-12 transition ease-in-out hover:scale-110 hover:text-white hover:bg-black">Go Back</button></a>
    </>
}
export default RouteError