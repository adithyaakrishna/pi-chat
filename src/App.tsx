import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WelcomeScreen from '@/components/welcome/welcome-screen';
import MainLayout from '@/components/layout/main-layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/app" element={<MainLayout />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;