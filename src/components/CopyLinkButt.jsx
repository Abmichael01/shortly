import IconButt from "./IconButt"
import { toast } from "react-toastify"

const CopyLinkButt = ({ keyword }) => {

    const copyLink = (link) => {
        navigator.clipboard.writeText(link)
        toast.success("Link Copied", {autoClose: 1000, hideProgressBar: true, })
    }

    return (
        <div>
            <IconButt icon="fa-solid fa-copy" onClick={() => { copyLink(`http://localhost:5173/${keyword}`) }} />
        </div>
    )
}

export default CopyLinkButt