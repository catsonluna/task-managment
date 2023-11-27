import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styles from '@/styles/cal.module.css';

function Cal() {
  return (
    <div className={`${styles.main}`}>
      <input type="datetime-local" className={`${styles.cal}`} name="" id="" ></input>
    </div>
  );
}

export default Cal;
