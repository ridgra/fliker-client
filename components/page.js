import Layout from './common/layout';
import Contents from './home/contents';
import Headings from './home/headings';
import Pagination from './home/pagination';
import styles from '../styles/home.module.scss';
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
