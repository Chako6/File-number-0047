import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Team from './pages/Team';
import CarPage from './pages/CarPage';
import SponsorsPage from './pages/Sponsors';
import ContactPage from './pages/Contact';
import NewsPage from './pages/News';
import NewsDetail from './pages/NewsDetail';

export default function App() {
  return (
    <LanguageProvider>
      <div className="font-sans">
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/car" element={<CarPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:slug" element={<NewsDetail />} />
          <Route path="/sponsors" element={<SponsorsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
