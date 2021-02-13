import cn from '../../../utils/cn';
import styles from './contents.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Contents() {
  const router = useRouter();
  const items = useSelector((state) => state.items);
  const tanggingItems = useSelector((state) => state.tanggingItems);
  const [cachedItems, setCachedItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    router.query.page && setCachedItems([...cachedItems, ...items]);
    router.query.page > 1 && window.scrollTo(0, router.query.page * 500);
  }, [router.query.page, router.asPath, dispatch]);

  useEffect(() => {
    router.query.tags && setCachedItems(tanggingItems);
  }, [router.query.tags, dispatch]);

  return router.query.page > 4 ? (
    <p {...cn(styles.notFound)}>Page Not Found</p>
  ) : (
    <article {...cn(styles.contents)}>
      {cachedItems.map((item, i) => (
        <figure key={i}>
          <div {...cn(styles.imgContainer)}>
            <Image
              src={`${item.media.m.slice(0, item.media.m.length - 1 - 5)}.jpg`}
              layout='fill'
              objectFit='cover'
              objectPosition='center'
              loading='lazy'
            />
          </div>
          <figcaption>
            <h2><a href={item.link} target='_blank'>{item.title}</a></h2>
            <p>
              <a
                target='_blank'
                href={`https://www.flickr.com/photos/${item.author_id}/`}
              >
                {item.author.match(/"(.*?)"/)[1]}
              </a>
            </p>
          </figcaption>
        </figure>
      ))}
    </article>
  );
}
