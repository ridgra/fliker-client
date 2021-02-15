import cn from '../../../utils/cn';
import styles from './pagination.module.scss';
import { useRouter } from 'next/router';

export default function Pagination() {
  const router = useRouter();

  const handlePagination = (e) => {
    e.preventDefault();
    router.push(`/?page=${(+router.query.page || 1) + 1}`, undefined, {
      shallow: false,
    });
  };

  return +router.query.page === 4 || router.query.tags ? (
    <p {...cn(styles.p)}>That's all for now! Please refresh for new updates.</p>
  ) : (
    (+router.query?.page < 4 || !router.query.page) && (
      <button onClick={handlePagination} {...cn(styles.button)}>
        <a>Load more Photos</a>
      </button>
    )
  );
}
