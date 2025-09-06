import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const [showToast, setShowToast] = useState(false)

  const getFeed = async () => {
    try {
      const response = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      if (response.data) {
        dispatch(addFeed(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const statusHandler = async (status, toUserId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/request/send/${status}/${toUserId}`,
        {},
        { withCredentials: true }
      );
      if (response.data) {
        dispatch(removeUserFromFeed(toUserId));
        if(status === "interested"){
          setShowToast(true)
          setTimeout(() => setShowToast(false), 5000)
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed || feed.length === 0)
    return (
      <div className="toast toast-center toast-middle">
        <div className="alert alert-warning text-m text-center">
          <span className="text-white text-">
            You’re all caught up!🎉 No new profiles right now.
          </span>
        </div>
      </div>
    );

  return (
    feed && (
      <div className="flex flex-col md:flex-row justify-center my-10">

          <UserCard
            user={feed[0]}
            statusHandler={statusHandler}
          />

        {showToast && 
          <div className="toast toast-top toast-start">
              <div className="alert alert-success">
                  <span>Sent Request Successfully.</span>
              </div>
          </div>
        }
      </div>
    )
  );
};

export default Feed;
