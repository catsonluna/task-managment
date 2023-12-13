import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/login.module.css'
import Header from '../components/header'
import ReactModal from 'react-modal';
import { useState } from 'react'; 
import axios from 'axios';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [isSignUp, setIsSignUp] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [email, setEmail] = useState(''); 
  const router = useRouter();

  const singup = (event: any) => {

    axios.post("/api/auth/register", {
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value
    }).then((res) => {
      console.log(res.data.data); 
      setCookie('token', res.data.data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
    }).catch((err) => {
      console.log(err); 
    }
    )
    router.push('/');
  }

  const login = (event: any) => {
    axios.post("/api/auth/login", {
      username: event.target.username.value,
      password: event.target.password.value
    }).then((res) => {
      console.log(res.data.data); 
      setCookie('token', res.data.data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
    }
    ).catch((err) => {
      console.log(err); 
    }
    )
  }

  const handleResetPassword = async (event: any) => {
    event.preventDefault();
    const response = await fetch('/api/your-api-route', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });
    const data = await response.json();
    console.log(data);
    setIsModalOpen(false);
  }

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
            <form action="#" className={`${styles.content}`} onSubmit={(e: any)=>{
              e.preventDefault();
              if(isSignUp) {
                singup(e); 
              }
              else {
                login(e); 
              }
            }}>
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
          <form onSubmit={handleResetPassword}>
            <input type="email" id="email" className={`${styles.inputmod}`} placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="submit" className={`${styles.submitmod}`}>Submit</button> 
          </form>
          <button onClick={() => setIsModalOpen(false)} className={`${styles.submitmod}`}>Close</button> 
        </ReactModal>
      </main>
    </>
  )
}