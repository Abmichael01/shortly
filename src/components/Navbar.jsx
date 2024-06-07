import { Link } from "react-router-dom"
import Button from "./Button"
import { REFRESH_TOKEN } from "../constants"

const Navbar = () => {
  const token = localStorage.getItem(REFRESH_TOKEN)
  return (
    <div className="flex items-center justify-between px-[15%] py-5 bg-white border border-zinc-300">
      <Link to="/">
        <div className="flex items-center gap-1">
          <i className="fa-solid fa-link font-bold text-violet-700 text-3xl"></i>
          <h2 className="text-2xl text-zinc-600 font-bold tracking-widest">Shortly</h2>
        </div>
      </Link>
      <nav className="flex items-center gap-10">
        {!token &&
          <Link to="/login" className="rounded-md px-4 py-[8px] bg-rose-500 text-xl text-white">
            Login
          </Link>
        }
        {token &&
          <Link to="/dashboard" className="text-xl text-zinc-500">
            Dashboard
          </Link>
        }
        {token &&
          <Link to="/logout" className="text-xl text-zinc-400 hover:text-zinc-500 transition-all duration-300">
            <i class="fa-solid fa-right-from-bracket"></i>
          </Link>
        }
      </nav>
    </div>
  )
}

export default Navbar
