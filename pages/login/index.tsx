import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/login.module.css'
import Header from '../components/header'
import ReactModal from 'react-modal';
import { useState } from 'react'; // Import useState hook
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [isSignUp, setIsSignUp] = useState(false); // Add a state variable for signup

  return (
    <>
      <Head>
        <title>{isSignUp ? 'Signup' : 'Login'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        <Header />
        <div className={`${isSignUp ? styles.signup : styles.login}`}> {/* Use the state variable here */}
            <h2 className={styles.subTitle}>{isSignUp ? 'Signup' : 'Login'}</h2>
            <form action="#" className={`${styles.content}`}>
                <input type="text" id="username" className={`${styles.input}`} placeholder='Username'/>
                <input type="password" id="password" className={`${styles.input}`} placeholder='Password'/>
                <div className={`${styles.al}`}>
                    <a>Forgot password?</a>
                </div>
                <button type="submit" className={`${styles.submit}`}>{isSignUp ? 'Signup' : 'Login'}</button>
            </form>
            <a onClick={() => setIsSignUp(!isSignUp)}> {/* Add an onClick handler to toggle the state */}
              {isSignUp ? 'Already have an account? Login' : 'Dont have an account? Signup'}
            </a>
        </div>
      </main>
    </>
  )
}
