import React, { useEffect, useState } from 'react';
import style from '@/styles/header.module.css'
import { Inter } from 'next/font/google'
import { getCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
const inter = Inter({ subsets: ['latin'] })

function Header(){
    const [isLogedIn, setIsLogedIn] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    useEffect(() => {
        const token = getCookie('token');
        if(token) {
            setIsLogedIn(true);
        }
    }, []);

    const router = useRouter();

    const handleClick = (event) => {
        event.preventDefault();
        if (event.currentTarget.getAttribute('href') === router.pathname) {
            setIsExpanded(!isExpanded);
        } else {
            setIsExpanded(false);
            router.push(event.currentTarget.getAttribute('href'));
        }
    }

    return(
        <>
            <div className={`${style.main}`}>
                <div className={`${style.header} ${isExpanded ? style.expanded : ''}`}>
                    <a className={`${style.res} ${router.pathname === '/' ? style.current : ''}`} href="/" onClick={handleClick}>Home</a>
                    <a className={`${style.res} ${router.pathname === '/create' ? style.current : ''}`} href="/create" onClick={handleClick}>Make a task</a>
                    <a className={`${style.res} ${router.pathname === '/calendar' ? style.current : ''}`} href="/calendar" onClick={handleClick}>Calendar</a>
                    {
                        isLogedIn ? <a className={`${style.res}`} onClick={() => {
                            deleteCookie('token');
                            router.push('/');
                        }}>Logout</a> : <a className={`${style.res}`} onClick={() => {
                            router.push('/login');
                        }}>Login/Signup</a>
                    }
                </div>
            </div>
        </>
    )
}
export default Header;
