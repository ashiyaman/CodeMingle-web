import { useState } from "react";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("ashiya@gmail.com")
    const [password, setPassword] = useState("Ashiya@123")

    const loginHandler = async() => {
        try{
            const res =  await axios.post("http://localhost:5000/login", {
                email, password
            }, { withCredentials: true })
            console.log(res.data)
        }
        catch(error){
            console.log(error)
        }
    }

  return (
    <div className="flex justify-center mt-10">
        <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
                <h2 className="card-title justify-center">Login</h2>
                <input type="text" placeholder="Email" className="input" onChange={(e) => setEmail(e.target.value)} value={email}/>
                <input type="text" placeholder="Password" className="input" onChange={(e) => setPassword(e.target.value)} value={password}/>
                <p>{email}{password}</p>
                <div className="card-actions justify-center mt-4">
                    <button className="btn btn-primary" onClick={loginHandler}>Login</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Login;
