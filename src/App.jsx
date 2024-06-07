import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import LinkStats from "./pages/LinkStats"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import NotFound from "./pages/NotFound"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Url from "./pages/Url"



function Logout(){
  localStorage.clear()
  return <Navigate to="/login"/>
}

function SignupAndLogout(){
  localStorage.clear()
  return <Signup />
}


function App() {

  return (
    <>
      <ToastContainer position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/link/stats/:urlId"
            element={
              <ProtectedRoute>
                <LinkStats />
              </ProtectedRoute>
            }
          />
          
          <Route path="/:keyword" element={<Url />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/logout" element={<Logout/>} />
          <Route path="/signup" element={<SignupAndLogout />}/>
          <Route path="*" element={<NotFound />}/>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
