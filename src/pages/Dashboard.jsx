import MainLayout from "../layouts/MainLayout"
import { Link } from "react-router-dom"
import IconButt from "../components/IconButt"
import { jwtDecode } from "jwt-decode"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import { useState, useEffect } from "react"
import api from "../api"
import { Icons, toast } from "react-toastify"
import CopyLinkButt from "../components/CopyLinkButt"

const Dashboard = () => {
  const [urls, setUrls] = useState([])
  const [url, setUrl] = useState("")
  const [keyword, setKeyword] = useState("")

  const token = localStorage.getItem(ACCESS_TOKEN)
  const decoded = jwtDecode(token)
  console.log(decoded)

  useEffect(() => {
    getUrls()
  }, [])


  const getUrls = () => {
    api.get("/api/get-urls/")
      .then((res) => { setUrls(res.data) })
      .catch((error) => { console.log(error) })
  }


  const shortenUrl = async (e) => {
    e.preventDefault()
    api.post("api/shorten-url/", { url, keyword })
      .then((res) => {
        if (res.status === 201) {
          toast.success("Link Shortened Successfully")
          getUrls();
        } else {
          console.log(res.data)
          toast.error(`${res.data.error}`)
        }
      })
      .catch(error => {
        toast.error(`${error.response.data.error}`)
      })

  }

  const deleteUrl = async (urlId) => {
    const confirmDelete = confirm("Are you sure you want to delete this url? ")
    if (confirmDelete) {
      api.delete(`api/delete-url/${urlId}/`)
        .then(res => {
          if (res.status == 200) {
            getUrls()
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  const refresh = ()=>{
    getUrls()
  }


  return (
    <MainLayout>
      <div className="px-[15%] py-10 flex flex-col gap-5">

        <form onSubmit={shortenUrl} className="px-10 py-8 bg-white border border-zinc-200 rounded-md flex justify-between gap-5">
          <input required type="text" onChange={(e) => { setUrl(e.target.value) }} placeholder="Paste link here" className="w-[100%] px-5 py-2 text-[18px] border border-zinc-300 outline-violet-400" />
          <input type="text" maxLength="6" onChange={(e) => { setKeyword(e.target.value) }} placeholder="Enter Keyword" className="w-[200px] px-5 py-2 text-[18px] border border-zinc-300 outline-violet-400" />
          <button className="px-5 py-2 text-[18px] rounded-md bg-gradient-to-tr hover:bg-gradient-to-bl  from-violet-800 via-violet-400 to-violet-900 text-white flex gap-1 items-center">
            <i className="fa-solid fa-link" />
            <span>Shorten</span>
          </button>
        </form>

        <div className="px-10 py-8 bg-white border border-zinc-200 rounded-md flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl text-zinc-500">{urls.length} Shortened Urls</h2>
            <IconButt onClick={refresh} icon={`fa-solid fa-arrows-rotate`} />
          </div>
          <div className="flex flex-col gap-5">
            {urls.map(url => (
              <div className="flex justify-between last:border-none border-b pb-5" key={url.id}>
                <div className="flex flex-col gap-2">
                  <Link to={`/${url.keyword}`} target="_blank">
                    <p className="text-zinc-400 text-[14px]">/{url.keyword}</p>
                  </Link>
                  <Link to={`${url.url}`} target="_blank">
                    <h2 className="text-[16px]">{url.url}</h2>
                  </Link>
                  {/* <p className="text-zinc-400 text-[14px]">/{url.keyword}</p>
                  <h2 className="text-[16px]">{url.url}</h2> */}
                </div>
                <div className="flex gap-5 items-center">
                  <p className="text-xl">{url.clicks}</p>
                  <Link to={`/link/stats/${url.id}`}>
                    <IconButt icon="fa-solid fa-chart-simple" />
                  </Link>
                  <CopyLinkButt keyword={url.keyword} />

                  <IconButt icon="fa-solid fa-trash" onClick={() => { deleteUrl(url.id) }} customStyles={`text-rose-500 border-rose-300 hover:bg-rose-100`} />

                </div>
              </div>
            ))}
            {urls.length == 0 &&
              <div className="flex justify-center text-zinc-300 text-3xl">
                <p>Your Have No Shortened Url</p>
              </div>}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Dashboard
