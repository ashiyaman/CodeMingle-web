import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [showRegister, setShowRegister] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const registerHandler = async() => {
         try {
            console.log("in register................")
            await axios.post(BASE_URL + "/logout", {
                withCredentials: true,
            });
            setShowRegister(true)
        }
        catch(error){
            console.log(error)
        }
    }

    const loginHandler = async() => {
        try{
            const response =  await axios.post(`${BASE_URL}/login`, {
                email, password
            }, { withCredentials: true })
            dispatch(addUser(response.data))
            navigate("/")
        }
        catch(error){
            setError(error?.response?.data || "Something Went Wrong")
        }
    }

    const signUpHandler = async() => {
        try {
            const response = await axios.post(`${BASE_URL}/signup`, {
                firstName, lastName, email, password
            }, { withCredentials: true })
            if(response?.data){
                dispatch(addUser(response.data))
                navigate("/profile")
            }
        }
        catch(error){
            setError(error?.response?.data || "Something went wrong")
        }
    }

  return (
    <div className="flex justify-center mt-10 mx-4 max-w-screen">
        <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
                <h2 className="card-title justify-center">{showRegister ? "Register" : "Login"}</h2>
                {showRegister && 
                    <>
                        <input type="text" placeholder="Firstname" className="input" onChange={(e) => setFirstName(e.target.value)} value={firstName}/>
                        <input type="text" placeholder="Lastname" className="input" onChange={(e) => setLastName(e.target.value)} value={lastName}/>
                    </>
                }
                <input type="text" placeholder="Email" className="input" onChange={(e) => setEmail(e.target.value)} value={email}/>
                <input type="password" placeholder="Password" className="input" onChange={(e) => setPassword(e.target.value)} value={password}/>
                <p className="text-red-500">{error}</p>
                <div className="card-actions justify-center mt-4">
                    <button className="btn btn-soft btn-secondary mx-1" 
                        onClick={showRegister ? signUpHandler : loginHandler}>{showRegister ? "Register" : "Login"}</button>
                </div>
                {
                    showRegister ? 
                    <p className="text-center my-8 text-lg">Already an user? <Link onClick={() => setShowRegister(false)} className="link link-warning">Please Login</Link></p> :
                    <p className="text-center my-8 text-lg">New User? 
                        <Link onClick={() => {registerHandler()}} className="link link-warning"> Register Now</Link></p>
                }
                
            </div>
        </div>
    </div>
  );
};

export default Login;
