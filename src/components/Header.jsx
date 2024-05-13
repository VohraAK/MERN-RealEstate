import { FaSearch } from 'react-icons/fa';
import {Link} from 'react-router-dom';

export default function Header() {
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
        <form className='bg-slate-100 rounded-md text-sm flex items-center'>
            <input className='bg-transparent text-md p-1.5 focus:outline-none w-24 sm:w-60 sm:text-sm' type='text' placeholder='Search' />
          <FaSearch className='text-slate-500 mx-1.5'/>
        </form>
        <ul className='flex gap-3'>
          <Link to='/about'><li className='hover:text-slate-600 hover:cursor-pointer'>About</li></Link>
          <Link to='/sign-in'><li className='hover:text-slate-600 hover:cursor-pointer'>Sign in</li></Link>
        </ul>
        </div>
    </header>
  )
}
