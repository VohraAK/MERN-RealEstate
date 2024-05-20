import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-10">
      <div className='bg-white flex flex-col gap-2 center border border-stone-600 border-opacity-40 shadow-gray-200 shadow-md rounded-md p-5 m-6 w-9/12 md:w-5/12 mx-auto'>
        <h1 className='text-2xl text-center'>Profile</h1>
        <img src={currentUser.avatar} className="rounded-full self-center object-cover cursor-pointer my-3" alt="" />
        <form className="flex flex-col items-center gap-4">
          <input type="text" placeholder="Username" id='username' className="border rounded-md p-3 w-11/12"/>
          <input type="email" placeholder="Email" id='email' className="border rounded-md p-3 w-11/12"/>
          <input type="password" placeholder="Password" id='password' className="border rounded-md p-3 w-11/12"/>
          <button className="bg-slate-600 text-slate-100 p-2 rounded-md shadow-sm shadow-gray-400 w-11/12 hover:opacity-95 disabled:opacity-80">Update</button>
        </form>
        <div className="flex justify-between mx-5 mt-4">
        <span className='cursor-pointer text-red-700'>Sign Out</span>
        <span className='cursor-pointer text-red-700'>Delete account</span>
        </div>
        
      </div>
    </div>
  )
}
