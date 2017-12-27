import _sansSerif from 'assets/FC-sans-serif.svg';
import _serif from 'assets/FC-serif.svg';
import _warning from 'assets/warning-triangle.svg';

const parser = new DOMParser();


export const sansSerif = ({ size = 18 } = {}) => {
  const ss = parser.parseFromString(_sansSerif(), 'image/svg+xml').children[0]
  ss.style.width = size + 'px';
  return ss
}

export const serif = ({ size = 18, adjusted } = {}) => {
  const s = parser.parseFromString(_serif(), 'image/svg+xml').children[0]
  s.style.width = size + 'px';
  if (adjusted) s.style['margin-bottom'] ='-4px'
  return s
}

export const warning = ({ size = 150 } = {}) => {
  const ss = parser.parseFromString(_warning(), 'image/svg+xml').children[0]
  ss.style.width = size + 'px';
  return ss
}
