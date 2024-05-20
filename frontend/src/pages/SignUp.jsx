import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({}); // set initial state to an empty object
  const [error, setError] = useState(null); // set initial state to null
  const [loading, setLoading] = useState(false); // set initial state to false
  const navigate = useNavigate();

  const handleChange = (e) => { setFormData({ ...formData, [e.target.id] : e.target.value }) };

  const handleSubmit = async (e) => {
    e.preventDefault(); // no refresh on submit
    try
    {
      setLoading(true); // switch to loading state
      const response = await fetch("/api/auth/signup", 
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success == false)  // checks if success flag (from index.js) is set to false
        {
          setError(data.message); // set error to the message returned
          setLoading(false);
          return;
        }
      setLoading(false); setError(null); navigate('/sign-in')
    }

    catch (error) { setLoading(false); setError(error.message); }
    console.log(formData);
  }

  return (
    <div className='p-10'>
      <div className='bg-white flex flex-col gap-5 center border border-stone-600 border-opacity-40 shadow-gray-200 shadow-md rounded-md p-5 m-6 w-9/12 md:w-5/12 mx-auto'>
        <h1 className='text-2xl text-center'>Create a free account</h1>
        <div className='p-6'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4 items-center'>
            <input type="text" id='username' onChange={handleChange} placeholder='Username' className='border rounded-md p-3 sm:w-11/12'/>
            <input type="text" id='email' onChange={handleChange} placeholder='Email' className='border rounded-md p-3 sm:w-11/12'/>
            <input type="password" id='password' onChange={handleChange} placeholder='Password' className='border rounded-md p-3 sm:w-11/12'/>
            <div className='flex flex-col sm:w-11/12 gap-3'>
              <button disabled={loading} className='bg-slate-600 text-slate-100 p-2 rounded-md shadow-sm shadow-gray-400 hover:opacity-95 disabled:opacity-80'>
                {loading ? 'Loading...' : 'Sign Up'}
              </button>
              <OAuth />
            </div>
          </form>
        </div>
      </div>
          <div className='flex flex-row w-9/12 md:w-5/12 mx-auto'>
            <p>Have an account?</p>
            <Link to={'/sign-in'}>
              <span className='mx-2 text-blue-500'>Sign in</span>
            </Link>
          </div>
          {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
