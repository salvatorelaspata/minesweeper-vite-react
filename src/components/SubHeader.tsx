import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SubHeader: React.FC = () => {
  const [title, setTitle] = useState('');
  const { pathname } = useLocation();
  useEffect(() => {
    let _title = '';
    switch (pathname) {
      case '/':
        _title = 'Game';
        break;
      case '/settings':
        _title = 'Settings';
        break;
      default:
        _title = '404';
        break;
    }
    setTitle(_title);
    document.title = `Minesweeper | ${_title}`;
  }, [pathname])

  return <h1>{title}</h1>
}


export default SubHeader;
