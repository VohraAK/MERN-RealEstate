import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();


  const handleSearchSubmit = (e) => {
    e.preventDefault();

    // get previous params
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromURL = urlParams.get('searchTerm');
    if (searchTermFromURL) {
      setSearchTerm(searchTermFromURL);
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return (
    <header className='bg-gray-200 shadow-md'>
      <div className='flex justify-between items-center mx-auto p-3.5 md:pd-3'>
        <Link to='/'>
        <h1 className='font-bold text-sm sm:text-xl md:text-xl flex flex-wrap'>
          <button>
            <span className='text-red-700'>Ghar</span>
            <span className='text-red-500'>Dhoondo</span>
          </button>
        </h1>
        </Link>
        <form onSubmit={handleSearchSubmit} className='bg-slate-100 rounded-md flex items-center p-2'>
            <input value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value)}} className='bg-transparent text-lg focus:outline-none w-24 sm:w-60 sm:text-sm' type='text' placeholder='Search...' />
            <button><FaSearch className='text-slate-500 mx-1.5'/></button>
            
        </form>
        <ul className='flex gap-5 items-center'>
          <Link to='/about'><li className='hover:text-slate-600 hover:cursor-pointer text-center'>About</li></Link>

          <Link to='/profile'>
          {/* show avatar if user is signed in */}
          {currentUser ? (<img className='rounded-full h-9 w-9 object-cover' src= {currentUser.avatar} alt='Profile'/>) : (<li className='hover:text-slate-600 hover:cursor-pointer'>Sign in</li>)}
          </Link>
        </ul>
        </div>
    </header>
  )
}
