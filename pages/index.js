import { initializeStore } from '../store';
import Layout from '../components/common/layout';
import Contents from '../components/home/contents';
import Headings from '../components/home/headings';
import Pagination from '../components/home/pagination';
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

export async function getServerSideProps(context) {
  const reduxStore = initializeStore();
  const { dispatch, getState } = reduxStore;

  const page = context.query.page || 1;

  const content = await fetch(
    `http://localhost:4000/public-feed?page=${page}&limit=6`
  );
  const jsonContent = await content.json();

  if (jsonContent.status === 404) {
    return {
      props: { redirect: '/' },
    };
  }

  const tags = context.query.tags;

  if (tags) {
    const tagingContent = await fetch(
      `http://localhost:4000/public-feed?tags=${tags}`
    );
    const jsonTaggingContent = await tagingContent.json();

    dispatch({
      type: 'SET_TAGGING_ITEMS',
      payload: jsonTaggingContent.items,
    });
    if (jsonTaggingContent) {
    }

    dispatch({
      type: 'SET_HEADING',
      payload: {
        title: jsonTaggingContent.title,
        date: jsonTaggingContent.modified,
      },
    });
  } else {
    dispatch({
      type: 'SET_ITEMS',
      payload: jsonContent.items,
    });

    dispatch({
      type: 'SET_HEADING',
      payload: { title: jsonContent.title, date: jsonContent.modified },
    });
  }

  return {
    props: {
      initialReduxState: reduxStore.getState(),
    },
  };
}
