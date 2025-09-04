import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import {addUser} from "../utils/userSlice"

const Editprofile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age);
  const [bio, setBio] = useState(user?.bio || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [skills, setSkills] = useState(user?.skills || []);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false)
  const dispatch = useDispatch()

  const editProfileHandler = async() => {
    try {
        const res = await axios.patch(
            BASE_URL + "/profile/edit",
            {
            firstName,
            lastName,
            age,
            gender,
            bio,
            photoUrl,
            skills,
            },
            { withCredentials: true }
        );
        dispatch(addUser(res?.data?.data))
        setShowToast(true)
        setTimeout(() => {setShowToast(false)}, 2000)        
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
        <div className="flex flex-col md:flex-row justify-center items-stretch">
            <div className="flex justify-center mt-10">
                <div className="card bg-base-300 w-96 shadow-sm">
                    <div className="card-body">
                    <h2 className="card-title justify-center my-2">Edit Profile</h2>
                    <label className="input">
                        <span className="label">Firstname:</span>
                        <input
                            type="text"
                            placeholder="Firstname"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                        />
                    </label>
                    <label className="input">
                        <span className="label">Lastname:</span>
                        <input
                            type="text"
                            placeholder="Lastname"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                        />
                    </label>
                    <label className="input">
                        <span className="label">Age:</span>
                        <input
                        type="number"
                        placeholder="Age"
                        onChange={(e) => setAge(e.target.value)}
                        value={age}
                        />
                    </label>
                    <select
                        defaultValue="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="select"
                    >
                        <option disabled={true}>Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </select>
                    <label className="input">
                        <span className="label">PhotoUrl:</span>
                        <input
                        type="text"
                        placeholder="PhotoUrl"
                        onChange={(e) => setPhotoUrl(e.target.value)}
                        value={photoUrl}
                        />
                    </label>
                    <label className="input">
                        <span className="label">Skills:</span>
                        <input
                        type="text"
                        placeholder="Skills"
                        onChange={(e) => setSkills(e.target.value)}
                        value={skills}
                        />
                    </label>
                    <textarea
                        placeholder="Bio"
                        className="textarea"
                        onChange={(e) => setBio(e.target.value)}
                        value={bio}
                    ></textarea>

                    <p className="text-red-500">{error}</p>
                    <div className="card-actions justify-center mt-4">
                        <button className="btn btn-primary" onClick={editProfileHandler}>
                        Update
                        </button>
                    </div>
                    </div>
                </div>
            </div>
            <UserCard user={user}/>
        </div>
        {showToast && 
            <div className="toast toast-top toast-start">
                <div className="alert alert-success">
                    <span>Profile updated successfully.</span>
                </div>
            </div>
        }
    </>
  );
};

export default Editprofile;
