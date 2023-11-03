import { Route, Routes } from "react-router-dom";
import './App.css'
// pages
import ErrorPage from './pages/ErrorPage';
import Layout from './components/Layout';
import Game from './pages/Game';
import Settings from './pages/Settings';

function App () {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Home />} /> */}
          <Route index element={<Game />} />
          <Route path='settings' element={<Settings />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
