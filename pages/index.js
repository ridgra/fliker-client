import Head from 'next/head';
import Layout from '../components/common/layout';
import Contents from '../components/home/contents';
import Headings from '../components/home/headings';
import Pagination from '../components/home/pagination';
import styles from '../styles/home.module.scss'
import cn from '../utils/cn';

export default function Home() {
  return (
    <Layout {...cn(styles.home)}>
      <Headings />
      <Contents />
      <Pagination />
    </Layout>
  );
}
