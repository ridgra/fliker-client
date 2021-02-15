import cn from '../../../utils/cn';
import styles from './contents.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Contents() {
  const router = useRouter();
  const items = useSelector((state) => state.items);
  const taggingItems = useSelector((state) => state.taggingItems);
  const [cachedItems, setCachedItems] = useState([]);

  const articleRef = useRef();

  useEffect(() => {
    if (taggingItems.length) {
      setCachedItems(taggingItems);
    } else {
      if (router.query.page) {
        setCachedItems([...cachedItems, ...items]);
        articleRef.current.scrollIntoView(false);
      } else {
        setCachedItems(items);
      }
    }
  }, [items, taggingItems]);

  return router.query.page > 4 ? (
    <p {...cn(styles.notFound)}>Page Not Found</p>
  ) : (
    <article ref={articleRef} {...cn(styles.contents)}>
      {cachedItems.map((item, i) => (
        <figure key={i}>
          <div {...cn(styles.imgContainer)}>
            <Image
              src={`${item.media.m.slice(0, item.media.m.length - 6)}.jpg`}
              layout='fill'
              objectFit='cover'
              objectPosition='center'
              loading='lazy'
            />
          </div>
          <figcaption>
            <h2>
              <a href={item.link} target='_blank'>
                {item.title}
              </a>
            </h2>
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
