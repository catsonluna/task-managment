import React, { useState } from 'react';
import style from '@/styles/header.module.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

function Header(){
    return(
        <>
            <div className={`${style.main}`}>
                <div className={`${style.header}`}>
                    <a className={`${style.res}`} href="/">Home</a>
                    <a className={`${style.res}`} href="/create">Make a task</a>
                    <a className={`${style.res}`} href="/login">Login/Signup</a>
                </div>
            </div>
        </>
    )
}
export default Header;