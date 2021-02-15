import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cn from '../../../utils/cn';
import styles from './headings.module.scss';

export default function Headings() {
  const [date, setDate] = useState('');
  const data = useSelector((state) => state.headings);

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

    const _date = new Date(data.date);
    setDate(_date.toLocaleString('en-SG', options));
  }, []);

  if (!data.title) {
    return <></>;
  }

  return (
    <section {...cn(styles.headings)}>
      <h1>{data.title}</h1>
      <p>
        Last modified&nbsp;<time>{date}</time>
      </p>
    </section>
  );
}
