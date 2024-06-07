import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import api from "../api"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import Loader from "./Loader"
import { toast } from 'react-toastify';


const AuthForm = ({ route, method }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const linkTo = method === "Login" ? "/signup" : "/login"
    const linkToName = method === "Login" ? "Signup" : "Login"


    const handleSubmit = async (e) =>{
        setLoading(true)
        e.preventDefault()

        if(loading){
            return
        }

        try{ 
            const res = await api.post(route, {username, password})
            if(method === "Login"){
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                
                navigate("/dashboard")
                toast.success("You have successfully logged in")

            } else{
                navigate("/login")
                toast.success("You have successfully signed up")
            }

        } catch(error){
            
            if(error.response){
                if (error.response.status === 401) {
                    toast.error("Incorrect username or password. Please try again.");
                } else if (error.response.status === 400) {
                    toast.error(`${error.response.data.username}`);
                } else {
                    console.log("Error:", error);
                }
            }
            
        } finally {
            setLoading(false)
        }
    }

    
    return (
        <div className="py-20">
            <form onSubmit={handleSubmit} className="flex flex-col h-fit px-10 py-14 space-y-8 backdrop-blur-md w-[500px] bg-white mt-0 rounded-xl border border-zinc-200">
                <h2 className="text-2xl text-zinc-600">{method}</h2>
                <input type="text" required placeholder="Username" onChange={(e)=>{setUsername(e.target.value)}} className="input" value={username}/>
                <input required type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} className="input" value={password}  />

                <button type="submit" className="bg-violet-700 hover:bg-violet-600 transition-all duration-300 py-3 text-xl text-white rounded-md flex justify-center">
                    {!loading && method}
                    {loading && <Loader />}
                </button>
                <p className="text-[18px]">Are you new? <Link to={linkTo} className="hover:underline"> {linkToName} </Link></p>
            </form>
        </div>
    )
}

export default AuthForm