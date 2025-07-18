import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Message from './Message';
import Footer from './Footer';
import WebcamPage from './WebcamPage';
import WebcamProcess from './WebcamProcess';
import Process from './Process';
import WebcamEntrance from './WebcamEntrance';
import "./index.css";
import WebcamExit from './WebcamExit';

function App() {
  return (
    <div>
      <Message />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Process />
              <WebcamEntrance />
            </>
          } />
        <Route
          path="/webcam"
          element={
            <>
              <WebcamPage />
              <WebcamExit />
            </>
          } />
      </Routes>
      <Footer />
    </div>
  );
}


export default App;