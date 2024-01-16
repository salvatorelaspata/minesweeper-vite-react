import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

interface HeaderProps {
  pathname: string;
}

const Header: React.FC<HeaderProps> = ({ pathname }) => {
  return (
    <nav>
      <ul>
        <li className={"/" === pathname || "/index.html" === pathname ? 'active' : ''}>
          <Link to="/">Minesweeper</Link>
        </li>
        {/* 
        <li className={"/game" === pathname ? 'active' : ''}>
          <Link to="/game" >Game</Link>
        </li> 
        */}
        <li className={"/settings" === pathname ? 'active' : ''}>
          <Link to="/settings" >Setting</Link>
        </li>
      </ul>
    </nav>
  );
}


export default Header;
