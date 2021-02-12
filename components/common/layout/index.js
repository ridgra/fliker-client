import Head from 'next/head';
import siteConfig from '../../../site.config';
import Link from 'next/link';
import SearchBar from './search-bar';
import cn from '../../../utils/cn';
import styles from './layout.module.scss';
import ReloadButton from './reload-button';

export default function Layout(props) {
  return (
    <>
      <Head>
        <title>{siteConfig.title}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header {...cn(styles.header)}>
        <nav>
          <Link href='/'>
            <a {...cn(styles.logo)}>fliker.</a>
          </Link>
        </nav>

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
    </>
  );
}
