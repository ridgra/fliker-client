import cn from '../../../../utils/cn';
import styles from './reload-button.module.scss';
import IconReload from '../../../../assets/icon-reload.svg';

export default function ReloadButton({ children }) {
  return (
    <button {...cn(styles.button)}>
      <IconReload />
    </button>
  );
}