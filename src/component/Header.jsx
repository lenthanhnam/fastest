import React, { useState } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Link } from 'react-router-dom'
import Logo from '../img/logo.png'
import Avatar from '../img/avatar.png'
import { MdAdd, MdLogout, MdShoppingCart } from 'react-icons/md';
import { motion } from 'framer-motion';
import { app } from './Connect';
import { actionType } from '../context/reducer';
import { useStateValue } from '../context/StateProvider'


export const Header = () => {
    const [isMenu, setIsMenu] = useState(false);
    const [{ user }, dispatch] = useStateValue();
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();
    //hàm đăng nhập
    const login = async () => {
        if (!user) {
            const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider);
            // console.log(response);
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0],
            });
        } else {
            setIsMenu(!isMenu);
        }
    }
    //hàm đăng xuất
    const logout = () => {
        setIsMenu(false);
        localStorage.clear();
        dispatch({
            type: actionType.SET_USER,
            user: null,
        });
    };

    return (
        <div className='fixed z-10 w-screen p-6 px-16 bg-primary'>
            {/* desktop and tablet */}
            <div className='hidden md:flex w-full h-full  p-2 justify-between items-center'>
                <Link to='/' className='flex items-center gap-2'>
                    <img className='w-8 object-cover' src={Logo} alt="" />
                    <p className='text-headingColor text-xl font-bold'>Food</p>
                </Link>
                <div className='flex items-center gap-8'>
                    <ul className='flex items-center gap-8 ml-auto'>
                        <li className="text-base text-slate-600 hover:text-cartBg duration-100 transition-all ease-in-out cursor-pointer">
                            Home
                        </li>
                        <li className="text-base text-slate-600 hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                            Menu
                        </li>
                        <li className="text-base text-slate-600 hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                            About Us
                        </li>
                        <li className="text-base text-slate-600 hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                            Services
                        </li>
                        <Link to='/register' className="text-base text-slate-600 hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                            Đăng ký
                        </Link>
                    </ul>
                    <div className='relative flex items-center justify-center'>
                        <MdShoppingCart className='text-textColor text-2xl ml-8 cursor-pointer'></MdShoppingCart>
                        <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
                            <p className='text-xs text-white font-semibold'>2</p>
                        </div>
                    </div>
                    <div className='relative'>
                        <motion.img whileTap={{ scale: 0.7 }}
                            src={user ? user.photoURL:Avatar} alt=""
                            className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl rounded-full cursor-pointer'
                            onClick={login}
                        />
                        {isMenu && (
                            <div className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-11 right-0'>
                                <Link to='/createItem'>
                                    <p onClick={() => setIsMenu(false)} className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 easein-out text-textColor text-base">
                                        <MdAdd />New Item</p>
                                </Link>
                                <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100
ease-in-out text-textColor text-base" onClick={logout}>
                                    <MdLogout />Logout</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/*Mobile */}
            <div className='flex md:hidden w-full h-full bg-blue-500 p-4'>

            </div>

        </div>
    )
}
