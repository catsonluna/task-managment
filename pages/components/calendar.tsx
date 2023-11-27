import React, { useState } from 'react';
import styles from '@/styles/cal.module.css';
import DateTime from 'react-datetime'; 
import 'react-datetime/css/react-datetime.css'; 

function Cal() {
  const [dateTime, setDateTime] = useState(new Date());

  return (
    <div className={styles.main}>
      <div className={styles.calWrapper}>
        <DateTime 
          value={dateTime} 
          onChange={setDateTime} 
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
