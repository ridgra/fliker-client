import clsx from 'clsx';

export default function cn(...params) {
  const cls = {};
  const cx = clsx(params);
  if (cx) {
    cls.className = cx;
    return cls;
  }
  return {};
}
