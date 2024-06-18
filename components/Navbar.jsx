import React from 'react';
import { Link } from 'react-router-dom'; // Importar Link de react-router-dom

const Navbar = () => {
  return (
    <nav className='bg-navbg'>
        <ul className='flex w-full justify-center gap-20 items-center p-4'>
            <li>
                <Link to='/about' className='p-2 bg-green-600 rounded-xl text-white cursor-pointer hover:bg-green-300 hover:text-black'>About</Link>
            </li>
            <li>
                <Link to='/policy' className='p-2 bg-green-600 rounded-xl text-white cursor-pointer hover:bg-green-300 hover:text-black'>Privacy Policy</Link>
            </li>
            <li>
                <Link to='/terms' className='p-2 bg-green-600 rounded-xl text-white cursor-pointer hover:bg-green-300 hover:text-black'>Terms</Link>
            </li>
        </ul>
    </nav>
  );
}

export default Navbar;