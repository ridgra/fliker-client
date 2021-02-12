import cn from '../../../utils/cn';
import styles from './dialog.module.scss';
import IconWarning from '../../../assets/icon-warning.svg';
import { useEffect, useRef } from 'react';

export default function Dialog({ setState, state, content }) {
  const refDialog = useRef();

  useEffect(() => {
    refDialog.current.open = state;
  }, [state]);
  return (
    <dialog ref={refDialog} {...cn(state && styles.dialog)}>
      <IconWarning />
      {content}
      <button onClick={() => setState(false)}>&times;</button>
    </dialog>
  );
}
