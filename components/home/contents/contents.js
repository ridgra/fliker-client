import cn from '../../../utils/cn';
import styles from './contents.module.scss';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function Contents({ children }) {
  useEffect(() => {
    // imgRef.current.style.borderRadius = imgRef.current?.offsetHeight / 5 + 'px';
    // console.log(imgRef.current.style.borderRadius = '50px')
    // imgRef.current.style.borderRadius = '50'
  }, []);

  return (
    <article {...cn(styles.contents)}>
      {images.map((e, i) => (
        <figure key={i}>
          <div {...cn(styles.imgContainer)}>
            <Image
              src='https://picsum.photos/500/400'
              layout='fill'
              objectFit='cover'
              quality={50}
              objectPosition='center'
            />
          </div>
          <figcaption>
            <h2>Refreshing Our Vision</h2>
            <p>Refreshing Our Vision</p>
          </figcaption>
        </figure>
      ))}
    </article>
  );
}

const images = new Array(9);
images.fill('1');
