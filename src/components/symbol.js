import _sansSerif from 'assets/FC-sans-serif.svg';
import _serif from 'assets/FC-serif.svg';

const parser = new DOMParser();


export const sansSerif = ({ size = 18 } = {}) => {
  const ss = parser.parseFromString(_sansSerif(), 'image/svg+xml').children[0]
  ss.style.width = size + 'px';
  return ss
}

export const serif = ({ size = 18 } = {}) => {
  const s = parser.parseFromString(_serif(), 'image/svg+xml').children[0]
  s.style.width = size + 'px';
  return s
}
