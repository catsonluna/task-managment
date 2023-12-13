import React, { useEffect, useState } from 'react';
import styles from '@/styles/cal.module.css';
import DateTime from 'react-datetime'; 
import 'react-datetime/css/react-datetime.css'; 
import Moment from 'moment';
function Cal({onChangeDate}: {onChangeDate: (date: Moment.Moment) => void}) {
  const [dateTime, setDateTime] = useState(Moment().add(30, "minutes"));

  useEffect(() => {
    onChangeDate(dateTime);
    console.log(dateTime);

  }, [])
  

  return (
    <div className={styles.main}>
      <div className={styles.calWrapper}>
        <DateTime 
          value={dateTime} 
          onChange={(e) => {
            console.log(e);
            setDateTime(e as Moment.Moment);
            onChangeDate(e as Moment.Moment);
          }} 
          inputProps={{ 
            className: styles.cal, 
            readOnly: true 
          }} 
        />
      </div>
    </div>
    
  );
}

export default Cal;
