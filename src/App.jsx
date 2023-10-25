import { Route, Routes } from "react-router-dom";
// pages
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import Layout from './components/Layout';
import Game from './pages/Game';
import Settings from './pages/Settings';

const COLUMN = 30
const ROW = 30
const MINES = 80

function App () {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="game" element={<Game rows={ROW} cols={COLUMN} bombs={MINES} />} />
          <Route path='settings' element={<Settings />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
