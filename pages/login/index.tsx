import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/login.module.css'
import Header from '../components/header'
import ReactModal from 'react-modal';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        <Header />
        <div className={`${styles.login}`}>
            <h2 className={styles.subTitle}>Login</h2>
            <form action="#" className={`${styles.content}`}>
                <input type="text" id="username" className={`${styles.input}`} placeholder='Username'/>
                <input type="password" id="password" className={`${styles.input}`} placeholder='Password'/>
                <div className={`${styles.al}`}>
                    <a>Forgot password?</a>
                </div>
                <button type="submit" className={`${styles.submit}`}>Login</button>
            </form>
        </div>
      </main>
    </>
  )
}