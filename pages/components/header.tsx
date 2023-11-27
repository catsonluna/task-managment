import React, { useEffect, useState } from 'react';
import style from '@/styles/header.module.css'
import { Inter } from 'next/font/google'
import { getCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
const inter = Inter({ subsets: ['latin'] })

function Header(){
    const [isLogedIn, setIsLogedIn] = useState(false);
    useEffect(() => {
        const token = getCookie('token');
        if(token) {
            setIsLogedIn(true);
        }
    }, []);

    const router = useRouter();

    return(
        <>
            <div className={`${style.main}`}>
                <div className={`${style.header}`}>
                    <a className={`${style.res}`} href="/">Home</a>
                    <a className={`${style.res}`} href="/create">Make a task</a>
                    <a className={`${style.res}`} href="/calendar">Calendar</a>
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