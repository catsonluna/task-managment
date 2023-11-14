import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from '@/styles/cal.module.css'

function Cal() {
  const [date, setDate] = useState(null);

  useEffect(() => {
    setDate(new Date());

    const timer = setInterval(() => {
      setDate(new Date());
    }, 86400000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <Calendar className={styles.reactCalendar} value={date} />
    </div>
  );
}

export default Cal;
