import IconButt from "./IconButt"
import api from "../api"
import Dashboard from "../pages/Dashboard"

const DeleteUrlButt = ({ urlId }) => {
    const deleteUrl = async (urlId) => {
        const confirmDelete = confirm("Are you sure you want to delete this url? ")
        if (confirmDelete) {
            api.delete(`api/delete-url/${urlId}/`)
                .then(res => {
                    if (res.status == 200) {
                        Dashboard.getUrls()
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
    return (
        <div>
            <IconButt icon="fa-solid fa-trash" onClick={() => { deleteUrl(urlId) }} />
        </div>
    )
}

export default DeleteUrlButt