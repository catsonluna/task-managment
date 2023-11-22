import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/login.module.css'
import Header from '../components/header'
import ReactModal from 'react-modal';
import { useState } from 'react'; 
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [isSignUp, setIsSignUp] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  return (
    <>
      <Head>
        <title>{isSignUp ? 'Signup' : 'Login'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        <Header />
        <div className={`${isSignUp ? styles.signup : styles.login}`}>
            <h2 className={styles.subTitle}>{isSignUp ? 'Signup' : 'Login'}</h2>
            <form action="#" className={`${styles.content}`}>
                <input type="text" id="username" className={`${styles.input}`} placeholder='Username'/>
                {isSignUp && <input type="email" id="email" className={`${styles.input}`} placeholder='Email'/>} 
                <input type="password" id="password" className={`${styles.input}`} placeholder='Password'/>
                {!isSignUp && <div className={`${styles.al}`}> 
                    <a onClick={() => setIsModalOpen(true)} className={`${styles.point}`}>Forgot password?</a> 
                </div>}
                <button type="submit" className={`${styles.submit}`}>{isSignUp ? 'Signup' : 'Login'}</button>
            </form>
            <a onClick={() => setIsSignUp(!isSignUp)} className={`${styles.point}`}> 
              {isSignUp ? 'Already have an account? Login' : 'Dont have an account? Signup'}
            </a>
        </div>
        <ReactModal isOpen={isModalOpen} className={`${styles.mod}`}> 
          <h2 className={`${styles.h1}`}>Reset Password</h2>
          <input type="email" id="email" className={`${styles.inputmod}`} placeholder='Email'/>
          <button type="submit" className={`${styles.submitmod}`}>Submit</button> 
          <button onClick={() => setIsModalOpen(false)} className={`${styles.submitmod}`}>Close</button> 
        </ReactModal>
      </main>
    </>
  )
}
