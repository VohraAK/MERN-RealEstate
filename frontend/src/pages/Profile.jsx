import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase.js';
import { updateUserStart, updateUserSuccess, updateUserFaliure, deleteUserStart, deleteUserSuccess, deleteUserFaliure, signOutStart, signOutSuccess, signOutFaliure } from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";

export default function Profile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => { if (file) { handleFileUpload(file) } }, [file]);

  const handleFileUpload = (file) => {   // handleFileUpload takes file as param
    const storage = getStorage(app);    //  calls a Firebase storage instance
    const fileName = new Date().getTime() + file.name;  // makes a unique filename based on current date
    const storageRef = ref(storage, fileName);    // create a storage reference with the associated filename
    const uploadTask = uploadBytesResumable(storageRef, file);

    // calls a resumable upload function (%)
    uploadTask.on(
      'state_changed', (snapshot) => {    // state-change listener on uploadTask -> runs on each change
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;    // calculates the percentage of file uploaded
      setFilePerc(Math.round(progress));
    },
    (error) => { setFileUploadError(true); },
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
      .then((downloadURL) => setFormData({ ...formData, avatar: downloadURL })); },
    );
  };

  // define function which changes formData on change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents page refresh on submit

    try 
    {
      // dispatch using updateUser reducers
      dispatch(updateUserStart());

      // fetch request using currentUser._id (from useSelector)
      const response = await fetch(`/api/user/update/${currentUser._id}`, 
      {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success === false)
      {
        dispatch(updateUserFaliure(data.message));
        return;
      }

      // dispatch success if data.success is not false
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } 
    catch (error) 
    {
      // dispatch error 
      dispatch(updateUserFaliure(error.message));
    }
  };

const handleDeleteUser = async () => {
  try 
  {
    // dispatch using deleteUser reducers
    dispatch(deleteUserStart());

    const response = await fetch(`/api/user/delete/${currentUser._id}`, { method: "DELETE" });
    const data = await response.json();

    if (data.success == true)
    {
      dispatch(deleteUserFaliure(data.message));
      return;
    }

    dispatch(deleteUserSuccess(data));
  } 

  catch (error) 
  {
    dispatch(deleteUserFaliure(error.message));
  }
};

const handleSignOut = async () => {
  try 
  {
    // dispatch using signOut reducers
    dispatch(signOutStart());

    const response = await fetch('api/auth/signout');
    const data = await response.json();

    if (data.success === false) 
    {
      dispatch(signOutFaliure(data.message));
      return;
    }

    dispatch(signOutSuccess(data));
  } 
  catch (error)
  {
    dispatch(signOutFaliure(error.message));
  }
};

  return (
    <div className="p-10">
      <div className='bg-white flex flex-col gap-2 center border border-stone-600 border-opacity-40 shadow-gray-200 shadow-md rounded-md p-5 m-6 w-9/12 md:w-5/12 mx-auto'>
        <h1 className='text-2xl text-center font-semibold'>Profile</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          {/* Set up file state s/t image gets reloaded from first entry of e.target.files */}
          <input onChange={(e) => setFile(e.target.files[0])} hidden type="file" accept="image/*" ref={fileRef}/>
          <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} className="rounded-full self-center object-cover cursor-pointer my-3 h-24 w-24 hover:opacity-90" />
          <p>
            { fileUploadError ? 
              (<span className="text-red-700">Error in uploading image (image must be less than 2 MB)</span>)
              :
              filePerc > 0 && filePerc < 100 ? (<span className="text-slate-700">{`Uploading: ${filePerc}%`}</span>)
              :
              filePerc === 100 ? (<span className="text-green-700">Image uploaded successfully</span>)
              : ("")
            }
          </p>
          <input type="text" placeholder="Username" defaultValue={currentUser.username} onChange={handleChange} id='username' className="border rounded-md p-3 w-11/12"/>
          <input type="email" placeholder="Email" defaultValue={currentUser.email} onChange={handleChange} id='email' className="border rounded-md p-3 w-11/12"/>
          <input type="password" placeholder="Password"  onChange={handleChange} id='password' className="border rounded-md p-3 w-11/12"/>
          <button disabled={loading} className="bg-slate-600 text-slate-100 p-2 rounded-md shadow-sm shadow-gray-400 w-11/12 hover:opacity-95 disabled:opacity-80">
            {loading ? "Loading..." : "Update"}
          </button>
          <Link className='bg-green-700 text-slate-100 p-2 rounded-md shadow-sm shadow-gray-400 w-11/12 hover:opacity-95 disabled:opacity-80 text-center' to={'/create-listing'}>
            Create New Listing
          </Link>
        </form>
        <div className="flex justify-between mx-5 mt-4">
        <span className='cursor-pointer text-red-700 hover:opacity-80' onClick={handleSignOut}>Sign out</span>
        <span className='cursor-pointer text-red-700 hover:opacity-80' onClick={handleDeleteUser}>Delete account</span>
        </div>
      <p className="text-red-700 text-bold mx-auto">{error ? error : ""}</p>
      <p className="text-green-700 text-bold mx-auto">{updateSuccess === true? "User details updated successfully!" : ""}</p>
      </div>
    </div>
  )
}
