import { useEffect, useState } from 'react';
import cn from '../../../utils/cn';
import styles from './headings.module.scss';

export default function Headings({ children }) {
  const [date, setDate] = useState('');
  useEffect(() => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'Asia/Singapore',
      timeZoneName: 'short',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };

    const _date = new Date(`2021-02-11T14:35:56Z`);
    setDate(_date.toLocaleString('en-SG', options));
  }, []);
  return (
    <section {...cn(styles.headings)}>
      <h1>Recent Uploads tagged hello and world</h1>
      <p>
        Last modified&nbsp;<time>{date}</time>
      </p>
    </section>
  );
}
