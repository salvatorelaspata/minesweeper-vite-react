import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import SubHeader from './SubHeader';

function Layout () {
  // get route path
  const { pathname } = useLocation();
  return (
    <div>
      <Header pathname={pathname} />
      <SubHeader />
      <hr />
      <Outlet />
      <hr />
    </div>
  );
}

export default Layout;