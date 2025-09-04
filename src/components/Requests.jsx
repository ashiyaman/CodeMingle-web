import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.request);
  const [showToast, setShowToast] = useState(false)
  const [status, setStatus] = useState("")
  const dispatch = useDispatch();


  const getRequests = async () => {
    const res = await axios.get(BASE_URL + "/user/request/received", {
      withCredentials: true,
    });
    dispatch(addRequests(res?.data?.data));
  };

  useEffect(() => {
    getRequests();
  }, []);

  const reviewRequest = async (requestId, status) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`, {},
        {withCredentials: true}
      );
      if(response.data){
        dispatch(removeRequest(requestId))
        setStatus(status)
        setShowToast(true)
        setTimeout(() => {
          setShowToast(false)
          setStatus("")
        }, 5000) 
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!requests || requests.length === 0)
    return (
      <div className="toast toast-center toast-middle">
        <div className="alert alert-warning text-m text-center">
          <span className="text-white text-">No new connection requests.</span>
        </div>
      </div>
    );

  return (
    <div className="text-center">
      <h1 className="text-2xl my-4">Connection Requests</h1>
      {requests &&
        requests.map((request) => {
          const {
            _id,
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            bio,
            skills,
          } = request.fromUserId;
          return (
            <div
              key={request._id}
              className="w-5/6 flex flex-col md:flex-row justify-between items-center m-4 p-4 rounded-lg bg-base-300 mx-auto"
            >
              <div className="flex items-center">
                <div className="h-20 w-20 flex">
                  <img
                    className="rounded-full object-cover"
                    src={photoUrl}
                    alt={`${firstName} Photo`}
                  />
                </div>
                <div className="px-4 justify-self-center text-left flex flex-col">
                  <div className="uppercase font-semibold">
                    {firstName + " " + lastName}
                  </div>
                  {age && gender && (
                    <div className="text-xs opacity-60">
                      {age} yrs | {gender}
                    </div>
                  )}
                  <p className="text-xs">{bio}</p>
                </div>
              </div>
              <div className="flex flex-row my-4">
                <div
                  className="btn btn-soft btn-warning mx-1"
                  onClick={() => reviewRequest(request._id, "rejected")}
                >
                  Reject
                </div>
                <div
                  className="btn btn-soft btn-secondary mx-1"
                  onClick={() => reviewRequest(request._id, "accepted")}
                >
                  Accept
                </div>
              </div>
            </div>
          );
        })}
      {showToast && 
            <div className="toast toast-top toast-start">
                <div className="alert alert-success">
                    <span>Request {status}.</span>
                </div>
            </div>
        }
    </div>
  );
};

export default Requests;
