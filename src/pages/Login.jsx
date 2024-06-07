import AuthForm from "../components/AuthForm"
import MainLayout from "../layouts/MainLayout"
import isAuthorized from "../components/ProtectedRoute"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { REFRESH_TOKEN } from "../constants"

const Login = () => {
  const token = localStorage.getItem(REFRESH_TOKEN)

  const navigate = useNavigate()

  useEffect(
    ()=>{
      if(token){
        navigate("/dashboard")
        return
      }
    }
  )

  return (
    <MainLayout>
      <div className="flex justify-center">
        <AuthForm route="/api/token/" method="Login" />
      </div>
    </MainLayout>
  )
}

export default Login
