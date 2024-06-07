import Navbar from "../components/Navbar"



const MainLayout = ({children}) => {
  return (
    <div className=" font-poppins text-zinc-600 min-h-screen bg-zinc-100">
      <Navbar />
      
      {children}
    </div>
  )
}

export default MainLayout
