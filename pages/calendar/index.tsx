import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/calendar.module.css'
import Header from '../components/header'
import { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import axios from 'axios'
import Task from '../components/task'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (!getCookie("token")) {
      router.push("/login");
    }
  }, [])

  const [tasks, setTasks] = useState([{
    title: "",
    description: "",
    dueTill: "",
    highPriority: false,
    completed: false,
    createdAt: "",

  }]);

  const [search, setSearch] = useState("");
  const getNextMonth = (dueTillDate: Date) => {
    const today = new Date();
      if(today.getMonth() == 11){ //or maybe 12 not sure parbaudit  
        if (dueTillDate.getMonth() == 0){ // or 1 idk check
          return true
        }else if(dueTillDate.getMonth() == today.getMonth() + 1){
          return true;
        }else{
          return false
        }}};

  useEffect(() => {
    axios.get("/api/task/all", {
      headers: {
        "session_token": getCookie("token")
      }
    }).then((res) => {
      console.log(res.data.tasks);
      setTasks(res.data.tasks.sort((a: any, b: any) => {
        return new Date(a.dueTill).getTime() - new Date(b.dueTill).getTime();
      }
      ));

    }
    ).catch((err) => {
      console.log(err);
    }
    )
    
  }, [])

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
        <div className={`${styles.serch}`}>
          <input type="text" className={`${styles.search}`} placeholder='Search task' 
          value={search} onChange={(e) => setSearch(e.target.value)} 
          ></input>
          <button className={`${styles.but}`} onClick={() => {
            router.push(`/task/${search}`);

          }}>Find</button>
        </div>
        <div className={styles.description}>
            <div className={`${styles.req}`}>{/*this month*/}
                <h1 className={`${styles.h1}`}>This month</h1>
                <div className={`${styles.tasks}`}>{/*parada tasks*/}

                {/** only show those tasks, that are due this month */}
                {tasks.map((task) => {
                  const dueTillDate = new Date(task.dueTill);
                  const today = new Date();
                  if (dueTillDate.getMonth() == today.getMonth()) {
                    return (
                      <Task title={task.title} description={task.description} dueTill={task.dueTill} highPriority={task.highPriority} completed={task.completed} createdAt={task.createdAt} />
                    )
                  }
                })}
                </div>
            </div>
            <div className={`${styles.req}`}>{/*next month*/}
                <h1 className={`${styles.h2}`}>Next month</h1>
                <div className={`${styles.tasks1}`}>{/*parada tasks*/}
                {/** only show those tasks, that are due next month */}
                {tasks.map((task) => {
                  const dueTillDate = new Date(task.dueTill);
                  const today = new Date();
                  if (getNextMonth(dueTillDate)) {
                    return (
                      <Task title={task.title} description={task.description} dueTill={task.dueTill} highPriority={task.highPriority} completed={task.completed} createdAt={task.createdAt} />
                    )
                  }
                })}

                </div>
            </div>
            <div className={`${styles.req}`}>{/*high priority*/}
                <h1 className={`${styles.h3}`}>High Priority</h1>
                <div className={`${styles.tasks2}`}>{/*parada tasks*/}
                {/** only show those tasks, that are high priority */}
                {tasks.map((task) => {
                  console.log(task.highPriority);
                  if (task.highPriority) {
                    return (
                      <Task title={task.title} description={task.description} dueTill={task.dueTill} highPriority={task.highPriority} completed={task.completed} createdAt={task.createdAt} />
                    )
                  }
                }
                )}
                </div>
            </div>
        </div>
      </main>
    </>
  )
}
