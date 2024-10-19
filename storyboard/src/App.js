import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <div className='Storyboard'>
          <Routes>
            <Route path='/LandingPage' element={<LandingPage />} />
            <Route path='/Home' element={<Home />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
