import { Link } from 'react-router-dom';
import './Header.css';

function Header ({ pathname }) {
  return (
    <nav>
      <ul>
        <li className={"/" === pathname ? 'active' : ''}>
          <Link to="/">Home</Link>
        </li>
        <li className={"/game" === pathname ? 'active' : ''}>
          <Link to="/game" >Game</Link>
        </li>
        <li className={"/settings" === pathname ? 'active' : ''}>
          <Link to="/settings" >Setting</Link>
        </li>
      </ul>
    </nav>
  );
}


export default Header;
