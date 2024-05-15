import React from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className='p-10'>
      <div className='bg-white flex flex-col gap-5 center border border-stone-600 border-opacity-40 shadow-gray-200 shadow-md rounded-md p-5 m-6 w-9/12 md:w-6/12 mx-auto'>
        <h1 className='text-2xl text-center'>Create a free account</h1>
        <div className='p-6'>
          <form className='flex flex-col gap-4 items-center'>
            <input type="text" id='username' placeholder='Username' className='border rounded-md p-3 sm:w-11/12'/>
            <input type="text" id='email' placeholder='Email' className='border rounded-md p-3 sm:w-11/12'/>
            <input type="text" id='password' placeholder='Password' className='border rounded-md p-3 sm:w-11/12'/>
            <div className='flex flex-col sm:w-11/12 gap-3'>
              <button className='bg-slate-600 text-slate-100 p-2 rounded-md shadow-sm shadow-gray-400'>SIGN UP</button>
              <button className='bg-red-500 p-2 text-slate-100 rounded-md shadow-sm shadow-gray-400'>CONTINUE WITH GOOGLE</button>
            </div>
          </form>
        </div>
      </div>
          <div className='flex flex-row w-9/12 md:w-6/12 mx-auto'>
            <p>Have an account?</p>
            <Link to={'/sign-in'}>
              <span className='mx-2 text-blue-500'>Sign in</span>
            </Link>
            </div>
    </div>
  )
}
