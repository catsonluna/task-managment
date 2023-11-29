import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/calendar.module.css'
import Header from '../components/header'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>task-management</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        <Header />
        <div className={styles.description}>
            <div className={`${styles.req}`}>{/*this month*/}
                <h1 className={`${styles.h1}`}>This month</h1>
                <div className={`${styles.tasks}`}>{/*parada tasks*/}
                  <div className={`${styles.list}`}>{/*main list*/}
                    <div className={`${styles.title}`}>{/*title*/}
                      <h1>Title</h1>
                    </div>
                    <div className={`${styles.desc}`}>{/*desc*/}
                      <h1>description</h1>
                    </div>
                    <div className={`${styles.date}`}>{/*date*/}
                      <h1>Date</h1>
                    </div>
                  </div>
                </div>
            </div>
            <div className={`${styles.req}`}>{/*next month*/}
                <h1 className={`${styles.h2}`}>Next month</h1>
                <div className={`${styles.tasks}`}>{/*parada tasks*/}

                </div>
            </div>
            <div className={`${styles.req}`}>{/*high priority*/}
                <h1 className={`${styles.h3}`}>High Priority</h1>
                <div className={`${styles.tasks}`}>{/*parada tasks*/}

                </div>
            </div>
        </div>
      </main>
    </>
  )
}
