import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/feedSlice"
import { useEffect } from "react"
import UserCard from "./UserCard"

const Feed = () => {
    const dispatch = useDispatch()
    const feed = useSelector((store) => store.feed)

    const getFeed = async() => {
        try{
            const response = await axios.get(BASE_URL + "/feed",
                {withCredentials: true}
            )
            if(response.data){
                dispatch(addFeed(response.data))
            }
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getFeed()
    }, [])

    return (
        feed && (
            <div className="flex flex-col md:flex-row justify-center my-10">
                {feed.map(userFeed => <UserCard user = {userFeed}/>)}                
            </div>)
    )
}

export default Feed