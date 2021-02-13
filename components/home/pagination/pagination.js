import Link from 'next/link';
import { useEffect } from 'react';
import cn from '../../../utils/cn';
import styles from './pagination.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

export default function Pagination() {
  const currentPage = useSelector((state) => state.currentPage);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch({
      type: 'SET_CURRENT_PAGE',
      currentPage: +currentPage + 1,
    });
  }, [dispatch]);

  

  return (+router.query.page === 4 || router.query.tags )? (
    <p {...cn(styles.p)}>That's all for now! Please refresh for new updates.</p>
  ) : (
    (+router.query?.page < 4 || !router.query.page) && (
      <Link href={`http://localhost:3000/?page=${currentPage}`}>
        <button {...cn(styles.button)}>
          <a>Load more Photos</a>
        </button>
      </Link>
    )
  );
}
