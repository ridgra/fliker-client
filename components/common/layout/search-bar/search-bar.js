import cn from '../../../../utils/cn';
import styles from './search-bar.module.scss';
import IconSearch from '../../../../assets/icon-search.svg';
import { useEffect, useRef, useState } from 'react';
import Dialog from '../../dialog';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

export default function SearchBar({ children }) {
  const [inputOnFocus, setInputOnFocus] = useState(false);
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

  const dispatch = useDispatch();

  const buttonRef = useRef();
  const inputRef = useRef();

  const router = useRouter();

  const tagsHandler = () => {
    tags.length < 3 ? setTags([...tags, tag]) : setShowDialog(true);
    setTag('');
  };

  const handleClick = (e) => {
    if (e.target.innerText === 'Add') {
      tagsHandler();
      inputRef.current.focus();
    } else {
      setTag('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && handleClick) {
      tagsHandler();
    }
  };

  const removeTag = (index) => {
    const arr = [...tags];
    arr.splice(index, 1);
    setTags(arr);
  };

  useEffect(() => {
    !tags.length
      ? router.replace('/?page=1')
      : router.replace(`/?tags=${tags.join(',')}`);

    dispatch({
      type: 'SET_TAGS',
      payload: tags,
    });

    setShowDialog(false);
  }, [tags]);

  return (
    <div {...cn(styles.search, inputOnFocus && styles.focus)}>
      <label {...cn(styles.inputContainer)}>
        <IconSearch />
        <input
          ref={inputRef}
          onChange={(e) => setTag(e.target.value)}
          type='text'
          value={tag}
          placeholder='Search tags'
          onFocus={() => setInputOnFocus(true)}
          onBlur={(e) => {
            e.relatedTarget !== buttonRef.current && setInputOnFocus(false);
          }}
          onKeyDown={handleKeyDown}
        />
        <button
          ref={buttonRef}
          onClick={handleClick}
          {...cn(styles.clearButton)}
        >
          {inputOnFocus ? tag && 'Add' : tag && 'Clear'}
        </button>
      </label>

      <div {...cn(styles.tags)}>
        {tags?.map((tag, i) => (
          <span key={i} onClick={() => removeTag(i)}>
            {tag} <strong>&times;</strong>
          </span>
        ))}
      </div>

      {showDialog && (
        <Dialog
          state={showDialog}
          setState={setShowDialog}
          content={'Only 3 tags are allowed.'}
        />
      )}
    </div>
  );
}
