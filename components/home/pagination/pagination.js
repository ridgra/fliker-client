import { useEffect, useState } from 'react';
import cn from '../../../utils/cn';
import styles from './pagination.module.scss';

export default function Pagination({ children }) {
  return <button {...cn(styles.button)}>Load more Photos</button>;
}
