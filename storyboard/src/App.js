import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='Storyboard'>
        <Routes>
          <Route path='/LandingPage' element={<LandingPage />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
