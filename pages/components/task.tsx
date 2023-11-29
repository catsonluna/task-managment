import React, { useEffect, useState } from 'react';
import styles from '@/styles/calendar.module.css'
function Task({title, description, dueTill, highPriority, completed, createdAt}: {title: string, description: string, dueTill: string, highPriority: boolean, completed: boolean, createdAt: string}) {
    
    // covert dueTill to date from iso string format
    const dueTillDate = new Date(dueTill);


    return (
        <div className={`${styles.list}`}>{/*main list*/}
            <div className={`${styles.title}`}>{/*title*/}
                <h1>{title}</h1>
            </div>
            <div className={`${styles.desc}`}>{/*desc*/}
                <h1>{description}</h1>
            </div>
            <div className={`${styles.date}`}>{/*date*/}
                <h1>{dueTillDate.toLocaleString()}</h1>
            </div>
        </div>
    );
}

export default Task;
