import MainLayout from "../layouts/MainLayout"
import IconButt from "../components/IconButt"
import { links } from "../constants"
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import api from "../api"
import CopyLinkButt from "../components/CopyLinkButt"


const Stats = () => {
  const { urlId } = useParams()
  const [stats, setStats] = useState([])
  const [url, setUrl] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    getStats()
    
  }, [stats.length])

  const getStats = async ()=>{
    try{
      const res = await api.get(`api/get-stats/${urlId}/`)
      if(res.status == 200){
        setStats(res.data.click)
        setUrl(res.data.url)
        console.log(stats)
      }

    }catch(error){
      console.log(error)
    }
  }

  const deleteUrl = async (urlId) => {
    const confirmDelete = confirm("Are you sure you want to delete this url? ")
    if (confirmDelete) {
      api.delete(`api/delete-url/${urlId}/`)
        .then(res => {
          if (res.status == 200) {
            navigate("/dashboard")
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
  


  return (
    <div>
      <MainLayout>
        <div className="px-[15%] py-10 flex flex-col gap-5">
          <div className="flex gap-5">
            <div className="px-10 py-8 bg-white border border-zinc-200 rounded-md flex flex-col gap-5 w-[200px]">
              <p className="text-zinc-400">Clicks</p>
              <p className=" text-5xl">{stats.length}</p>
            </div>
            <div className="px-10 py-8 bg-white border border-zinc-200 rounded-md flex items-center justify-between gap-5 w-full">
              <div className="flex flex-col gap-2">
                <p className="text-zinc-400 text-[14px]">/{url.keyword}</p>
                <h2 className="text-[16px]">{url.url}</h2>
              </div>
              <div className="flex items-center gap-5">
                <CopyLinkButt keyword={url.keyword} />
                <IconButt icon="fa-solid fa-trash" onClick={() => { deleteUrl(url.id) }} customStyles={`text-rose-500 border-rose-300 hover:bg-rose-100`} />
              </div>
            </div>
          </div>
          <div className="px-10 py-8 bg-white border border-zinc-200 rounded-md flex flex-col gap-8">
            <h2 className="text-2xl text-zinc-500">All Locations</h2>
            <div className="flex flex-col gap-5">
              {stats.map(stat => (
                <div key={stat.id} className="flex justify-between border-b pb-5">
                  <div className="flex flex-col gap-2">
                    <p className="text-zinc-400">IP Address</p>
                    <h2 className="text-xl">{stat.ip_address}</h2>
                  </div>
                  <div className="flex gap-5 items-center">
                    <p className="text-xl">{stat.location}</p>
                  </div>
                </div>
              ))}
              {stats.length == 0 && <div className="text-2xl text-zinc-400 text-center" >No Clicks Yet</div> }
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  )
}

export default Stats
