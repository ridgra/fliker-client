import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Page from '../components/page';
import { initializeStore } from '../store';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (router.asPath === '/') {
      router.replace('/?page=1');
    }
  }, [router.asPath]);
  return <Page />;
}

export async function getServerSideProps(context) {
  const reduxStore = initializeStore();
  const { dispatch, getState } = reduxStore;

  const page = context.query.page || 1;

  // if (!page) {
  //   return {
  //     props: { redirect: '/?page=1' },
  //   };
  // }

  const tags = context.query.tags;

  const content = await fetch(
    `http://localhost:4000/public-feed?page=${context.query.page}&limit=6`
  );
  const jsonContent = await content.json();

  if (!jsonContent.items) {
    return {
      props: {
        initialReduxState: reduxStore.getState(),
        redirect: '/',
      },
    };
  }

  if (tags) {
    const tagingContent = await fetch(
      `http://localhost:4000/public-feed?tags=${tags}&limit=6`
    );
    const jsonTaggingContent = await tagingContent.json();

    dispatch({
      type: 'SET_TAGGING_ITEMS',
      payload: jsonTaggingContent.items,
    });

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

  dispatch({
    type: 'SET_CURRENT_PAGE',
    currentPage: page,
  });

  return {
    props: {
      initialReduxState: reduxStore.getState(),
    },
  };
}
