import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loginHandler = async() => {
        try{
            const res =  await axios.post(BASE_URL + "/login", {
                email, password
            }, { withCredentials: true })
            dispatch(addUser(res.data))
            navigate("/")
        }
        catch(error){
            setError(error?.response?.data || "Something Went Wrong")
        }
    }

  return (
    <div className="flex justify-center mt-10">
        <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
                <h2 className="card-title justify-center">Login</h2>
                <input type="text" placeholder="Email" className="input" onChange={(e) => setEmail(e.target.value)} value={email}/>
                <input type="text" placeholder="Password" className="input" onChange={(e) => setPassword(e.target.value)} value={password}/>
                <p className="text-red-500">{error}</p>
                <div className="card-actions justify-center mt-4">
                    <button className="btn btn-primary" onClick={loginHandler}>Login</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Login;
