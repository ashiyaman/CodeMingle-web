
import { useSelector } from "react-redux"
import Editprofile from "./EditProfile"

const Profile = () => {
    const user = useSelector(store => store.user)

    return (
        <>
            {user && <Editprofile user={user}/> }
            
        </>
    )
}

export default Profile