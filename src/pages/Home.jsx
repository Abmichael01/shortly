import MainLayout from "../layouts/MainLayout"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <MainLayout>
      <div className="h-[500px] bg-zinc-950 flex flex-col justify-center items-center">
        <h2 className="text-6xl font-semibold w-3/5 text-center bg-gradient-to-r from-purple-300 via-rose-400 to-violet-500 bg-clip-text text-transparent">
          Make Custom Shortened URLs In Few Clicks
        </h2>
        <Link to='/signup'>
          <button className="px-6 py-3 rounded-md text-white bg-violet-700 hover:bg-violet-600 transition-all duration-300 text-2xl mt-10">
            Get Started
          </button>
        </Link>
      </div>
    </MainLayout>
  )
}

export default Home
