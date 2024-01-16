import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SubHeader: React.FC = () => {
  const [title, setTitle] = useState('');
  const { pathname } = useLocation();
  console.log('[SubHeader.tsx]', pathname);
  useEffect(() => {
    let _title = '';
    switch (pathname) {
      case '/':
      case '/index.html':
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
    const setDocumentTitle = (t: string) => document.title = `Minesweeper | ${t}`;

    if (pathname === '/index.html') {
      setTimeout(() => { // workaround for title "Socket" not updating
        setDocumentTitle(_title)
      }, 1000);
    } else {
      setDocumentTitle(_title)
    }
  }, [pathname])

  return <h1>{title}</h1>
}


export default SubHeader;
