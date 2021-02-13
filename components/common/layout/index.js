import Head from 'next/head';
import siteConfig from '../../../site.config';
import Link from 'next/link';
import SearchBar from './search-bar';
import cn from '../../../utils/cn';
import styles from './layout.module.scss';
import ReloadButton from './reload-button';

export default function Layout(props) {
  return (
    <div {...cn(styles.container)}>
      <Head>
        <title>{siteConfig.title}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header {...cn(styles.header)}>
        <span {...cn(styles.logo)}>{siteConfig.title}</span>

        <SearchBar />

        <ReloadButton />
      </header>

      <main {...props} />

      <footer {...cn(styles.footer)}>
        <cite>
          <Link href='/'>
            <a>{siteConfig.title} </a>
          </Link>
          © {new Date().getFullYear()}&nbsp;by&nbsp;
          <a href='https://www.linkedin.com/in/ridgra' target='_blank'>
            Ridho Anugrah
          </a>
        </cite>
      </footer>
    </div>
  );
}
