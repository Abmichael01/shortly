const IconButt = ({icon, onClick, customStyles}) => {
    return (
      <div>
        <div onClick={onClick} className={`px-2 py-1 border border-violet-300 hover:bg-violet-100 transition-all duration-300 rounded-md text-xl cursor-pointer text-violet-500 ${customStyles}`}>
          <i className={icon}></i>
        </div>
      </div>
    )
  }
  
  export default IconButt