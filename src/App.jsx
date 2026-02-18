import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Blog from './components/Blog';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import './App.css';

function App() {
  const [logoClicks, setLogoClicks] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSecretAccess = () => {
    const newClicks = logoClicks + 1;
    setLogoClicks(newClicks);
    if (newClicks >= 5) {
      const pass = prompt("Sistem Yönetici Şifresi:");
      if (pass === "evim2026") {
        navigate('/admin');
      } else if (pass !== null) {
        alert("Hatalı şifre!");
      }
      setLogoClicks(0);
    }
    setTimeout(() => setLogoClicks(0), 3000);
  };

  const scrollToCalculator = () => {
    const scrollLogic = () => {
      const el = document.querySelector('.calculator-card');
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    };

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(scrollLogic, 500);
    } else {
      scrollLogic();
    }
    setIsMenuOpen(false);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    handleSecretAccess();
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="App">
      <header className={`header ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="container header-container">
          <div className="header-top-row">
            <a href="/" onClick={handleLogoClick} className="logo">
              <div className="logo-icon">
                <img src="/logo.png" alt="ENİYİKATILIM Logo" />
              </div>
              <div className="logo-text">ENİYİ<span>KATILIM</span></div>
            </a>
          </div>

          <div className="header-main-row">
            <div className="header-center">
              {location.pathname === '/admin' && <span className="admin-breadcrumb">Yönetim Paneli</span>}
            </div>

            <div className="header-right">
              <div className="nav-right desktop-only">
                <Link to="/blog" className="header-nav-link">Blog</Link>
                <Link to="/biz-kimiz" className="header-nav-link">Biz Kimiz</Link>
                <Link to="/iletisim" className="btn-contact">Bize Ulaşın</Link>
              </div>

              {/* Hamburger Icon */}
              <button className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)} style={isMenuOpen ? { display: 'none' } : {}}>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>

          <nav className={`nav-center-mobile ${isMenuOpen ? 'mobile-visible' : ''}`}>
            <div className="mobile-menu-header">
              <a href="/" onClick={handleLogoClick} className="logo">
                <div className="logo-icon">
                  <img src="/logo.png" alt="ENİYİKATILIM Logo" />
                </div>
                <div className="logo-text">ENİYİ<span>KATILIM</span></div>
              </a>
              <button className="mobile-menu-close" onClick={() => setIsMenuOpen(false)}>×</button>
            </div>
            <div className="mobile-menu-links">
              <Link to="/" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>Ana Sayfa</Link>
              <a href="#" className="mobile-menu-link" onClick={(e) => { e.preventDefault(); scrollToCalculator(); }}>Hesaplama Aracı</a>
              <Link to="/blog" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>Blog & Haberler</Link>
              <Link to="/biz-kimiz" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>Biz Kimiz</Link>
              <Link to="/iletisim" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>Bize Ulaşın</Link>
            </div>
            <div className="mobile-menu-footer">
              <Link to="/iletisim" className="mobile-menu-cta" onClick={() => setIsMenuOpen(false)}>Bize Ulaşın</Link>
              <p className="mobile-menu-tagline">⚡ En İyi Katılım Fırsatları</p>
            </div>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/biz-kimiz" element={<About />} />
        <Route path="/iletisim" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

      <footer className="footer-mini">
        <div className="container">
          <p>© 2026 ENİYİKATILIM. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div >
  );
}

export default App;
