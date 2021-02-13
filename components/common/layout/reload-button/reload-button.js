import cn from '../../../../utils/cn';
import styles from './reload-button.module.scss';
import IconReload from '../../../../assets/icon-reload.svg';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

export default function ReloadButton() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = () => {
    router.push('/?page=1');
  };

  return (
    <button onClick={handleClick} {...cn(styles.button)}>
      <IconReload />
    </button>
  );
}
