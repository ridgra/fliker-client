import cn from '../../../../utils/cn';
import styles from './reload-button.module.scss';
import IconReload from '../../../../assets/icon-reload.svg';

export default function ReloadButton() {
  const handleClick = () => {
    window.location.href = '/';
  };

  return (
    <button onClick={handleClick} {...cn(styles.button)}>
      <IconReload />
    </button>
  );
}
