import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/task.module.css'
import Header from '../components/header'
import { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import axios from 'axios'
import { useRouter } from 'next/router'
import { dateFormat } from './utils'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  const name = router.query.name;

  useEffect(() => {
    if (!getCookie("token")) {
      router.push("/login");
    }
  }, [])

  useEffect(() => {
    if(name == null){
      return;
    }

    axios.get("/api/task/view", {
      headers: {
        "session_token": getCookie("token"),
        "task_name": name
      }
    }).then((res) => {
      console.log(res.data.tasks);
      setTasks(res.data.tasks);


    }
    ).catch((err) => {
      console.log(err);
    }
    )

  }, [name])

  const [tasks, setTasks] = useState({
    title: "",
    description: "",
    dueTill: "",
    highPriority: false,
    completed: false,
    createdAt: "",

  });
  if(tasks == null || tasks.title == null){
    return <>
      <main className={`${styles.main}`}>
      <h1>
        Task not found
      </h1>
      <button onClick={() => router.push("/calendar")}>Go back</button>
    </main>
      </>

  }

  if(tasks.title == ""){ 
    return <div>loading...</div>
  }
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
        <div className={styles.description1}>
          <h1 className={`${styles.title}`}>
            {tasks.title}
          </h1>

          <h2 className={`${styles.desc}`}>
            {tasks.description}
          </h2>

          <h2 className={`${styles.desc1}`}>
            started at:{dateFormat(tasks.createdAt)}
          </h2>

          <h2 className={`${styles.desc1}`}>
            due till:{dateFormat(tasks.dueTill)}
          </h2>

          <h2 className={`${styles.desc1}`}>
            high priority:{tasks.highPriority ? "yes" : "no"}
          </h2>

 
          </div>
        </div>
      </main>
    </>
  )
}
