import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';

function Layout() {
  // get route path
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
     <Header/>
      <hr />
      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
      <hr />
    </div>
  );
}

export default Layout;