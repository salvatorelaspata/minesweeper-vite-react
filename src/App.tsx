import React from 'react';
import { Route, Routes, matchRoutes, useResolvedPath } from "react-router-dom";
// pages
import ErrorPage from './pages/ErrorPage';
import Layout from './components/Layout';
import Game from './pages/Game';
import Settings from './pages/Settings';

import './App.css'

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Home />} /> */}
          <Route index element={<Game />} />
          <Route path='/index.html' element={<Game />} />
          <Route path='settings' element={<Settings />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
