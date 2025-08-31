import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.request);
  console.log("in conne....", requests);
  const dispatch = useDispatch();
  const getRequests = async () => {
    const res = await axios.get(BASE_URL + "/user/request/received", {
      withCredentials: true,
    });
    console.log(res?.data?.data);
    dispatch(addRequests(res?.data?.data));
  };

  useEffect(() => {
    getRequests();
  }, []);

  const reviewRequest = async(requestId, status) => {
    try{
        const res = await axios.post(`${BASE_URL}/request/review/${status}/:${requestId}`)
        console.log(res)
    }
    catch(error){
        console.log(error.message)
    }
  }

  if (!requests || requests.length === 0)
    return <p className="text-center m-4">No Connection Requests Found</p>;

  return (
    <div className="text-center">
    <h1 className="text-2xl my-4">Connection Requests</h1>
        {requests && 
                requests.map(request => {
                    const {_id,firstName, lastName, photoUrl, age, gender, bio, skills} = request.fromUserId
                    return (
                        <div key={request._id} className="w-2xl flex justify-between m-4 p-4 rounded-lg bg-base-300 mx-auto">
                            <div className="flex">
                                <div className="h-20 w-20 flex">
                                    <img
                                    className="rounded-full object-cover"
                                        src={photoUrl} alt={`${firstName} Photo`}
                                    />                           
                                </div>
                                <div className="px-4 justify-self-center text-left flex flex-col">
                                    <div className="uppercase font-semibold">{firstName + " " + lastName}</div>
                                    {age && gender &&<div className="text-xs opacity-60">
                                    {age} yrs | {gender}
                                    </div>}
                                    <p className="text-xs">
                                        {bio}
                                    </p>
                                </div>       
                            </div>  
                            <div className="flex flex-row">
                                <div className="btn btn-soft btn-warning mx-1" onClick={reviewRequest(_id, "ignored")}>Ignore</div>
                                <div className="btn btn-soft btn-secondary mx-1" onClick={reviewRequest(_id, "interested")}>Interested</div>
                            </div>              
                        </div>
                    )
                }
                )

        }
    </div>
  );
};

export default Requests;
