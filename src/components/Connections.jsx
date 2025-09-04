import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
    const connections = useSelector(store => store.connection)
    const dispatch = useDispatch();
    const getConnections = async () => {
    const res = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });
    dispatch(addConnections(res?.data?.data));
  };

  useEffect(() => {
    getConnections();
  }, []);

  if(!connections || connections.length === 0) return (
      <div className="toast toast-center toast-middle">
        <div className="alert alert-warning text-m text-center">
          <span className="text-white text-">No connections found.</span>
        </div>
      </div>
    );
  return (
    <div className="text-center">
    <h3 className="text-2xl my-4">Connections</h3>
        {connections && 
            <ul className="m-auto w-3/4">
                {connections.map(connection => {
                    const {firstName, lastName, photoUrl, age, gender, bio} = connection
                    return (
                        <li key={connection._id} className="flex p-5 rounded-box bg-base-300 my-2">
                            <div className="h-20 flex justify-center">
                                <img
                                    className="rounded-full align-middle"
                                    src={photoUrl} alt={`${firstName} Photo`}
                                />
                            </div>
                            <div className="mx-4 text-left flex flex-col justify-center">
                                <div className="uppercase font-semibold">{firstName + " " + lastName}</div>
                                {age && gender &&<div className="text-xs opacity-60">
                                {age} yrs | {gender}
                                </div>}
                                <p className="text-xs">
                                    {bio}
                                </p>
                            </div>                        
                        </li>
                    )
                }
                )}
            </ul>
        }
    </div>
  );
};

export default Connections;
