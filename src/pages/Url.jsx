import { useState, useEffect } from "react"
import { redirect, useLocation, useNavigate, useParams } from "react-router-dom"
import api from "../api"
import axios from "axios"
import NotFound from "./NotFound"

const Url = () => {
    const { keyword } = useParams()
    const [ip, setIpAddress] = useState('');
    const [location, setLocation] = useState("");

    const navigate = useNavigate()

    useEffect(() => {
        const fetchUrl = () => {
            axios.get(`https://shortly-backend-5b4660853352.herokuapp.com/api/get-url/${keyword}/`)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data.url)
                    window.location.replace(res.data.url)
                }
            })
            .catch(error => {
                console.log(error)
            })
        }

        fetchUrl()
        

    }, [])


    return <div>Redirecting...</div>


}

export default Url