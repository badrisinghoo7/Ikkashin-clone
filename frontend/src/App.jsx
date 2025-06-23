
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Navbar from './components/Navbar';

function App() {
  return (
    
      <Router>
      <Routes>
        <Route path="/" element={<Navbar /> } />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
