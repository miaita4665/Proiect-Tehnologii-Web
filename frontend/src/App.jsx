import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateConference from './pages/CreateConference';
import SubmitPaper from './pages/SubmitPaper';     // <--- NOU
import ReviewDashboard from './pages/ReviewDashboard'; // <--- NOU

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          
          {/* Rute specifice */}
          <Route path="/create-conference" element={<CreateConference />} />
          <Route path="/submit-paper" element={<SubmitPaper />} />       {/* <--- NOU */}
          <Route path="/reviews" element={<ReviewDashboard />} />        {/* <--- NOU */}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;