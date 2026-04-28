import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ClickSpark from './components/animations/ClickSpark';
import TargetCursor from './components/animations/TargetCursor';
import LandingPage from './pages/public/LandingPage';
import AuthPage from './pages/public/AuthPage';
import OrderPage from './pages/authenticated/OrderPage';
import StatsPage from './pages/authenticated/StatsPage';

function App() {
  const location = useLocation();
  const isAppRoute = location.pathname.startsWith('/app');
  const isLandingPage = location.pathname === '/';

  return (
    <ClickSpark
      sparkColor="var(--blushed-brick)"
      sparkSize={12}
      sparkRadius={20}
      sparkCount={10}
      duration={550}
      extraScale={1.2}
    >
      <TargetCursor targetSelector=".cursor-target" spinDuration={3.2} />
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/app/order" element={<OrderPage />} />
        <Route path="/app/stats" element={<StatsPage />} />
        <Route path="/app" element={<Navigate to="/app/order" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isAppRoute && !isLandingPage && <Footer />}
    </ClickSpark>
  );
}

export default App
