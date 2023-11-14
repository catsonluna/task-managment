import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-calendar/dist/Calendar.css';
import styles from '@/styles/cal.module.css'

const DynamicCalendar = dynamic(
  () => import('react-calendar'),
  { ssr: false }
)

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
      <DynamicCalendar className={styles.reactCalendar} value={date} />
    </div>
  );
}

export default Cal;
