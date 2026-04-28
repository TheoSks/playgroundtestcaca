import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';
import logoText from '../../assets/logo-text.png';
import './Navbar.css';

const publicLinks = [
  { label: 'Hero', href: '/#hero', icon: 'hgi-home-01' },
  { label: 'Univers', href: '/#features', icon: 'hgi-sword-01' },
  { label: 'Events', href: '/#events', icon: 'hgi-calendar-03' },
];

const appLinks = [
  { label: 'Commander', path: '/app/order', icon: 'hgi-clipboard' },
  { label: 'Stats', path: '/app/stats', icon: 'hgi-chart-line-data-01' },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const isApp = location.pathname.startsWith('/app');

  return (
    <motion.nav
      className={`navbar ${isApp ? 'navbar--app' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo cursor-target" aria-label="Retour a l'accueil Playground">
          <span className="navbar__logo-shell">
            <img src="/PLAYGROUND-TETE 1.svg" alt="Gobelin Playground" className="navbar__logo-icon" />
          </span>
        </Link>

        <div className="navbar__links">
          {isApp
            ? appLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `navbar__link navbar__link--app cursor-target ${isActive ? 'is-active' : ''}`}
              >
                <i className={`hgi-stroke ${link.icon}`} aria-hidden="true" />
                <span>{link.label}</span>
              </NavLink>
            ))
            : publicLinks.map((link) => (
              <a key={link.href} href={link.href} className="navbar__link cursor-target">
                <i className={`hgi-stroke ${link.icon}`} aria-hidden="true" />
                <span>{link.label}</span>
              </a>
            ))}
        </div>

        <div className="navbar__actions">
          {user ? (
            <div className="navbar__user cursor-target">
              <img src="/PLAYGROUND-TETE 1.svg" alt="gobelin" className="navbar__user-avatar" />
              <span className="navbar__user-name">{user.pseudo}</span>
              <button
                className="navbar__user-logout cursor-target"
                onClick={() => { logout(); navigate('/'); }}
                aria-label="Se deconnecter"
              >
                <i className="hgi-stroke hgi-logout-01" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <Link to="/auth" className="btn btn--primary btn--pill cursor-target">
              <i className="hgi-stroke hgi-cursor-click-01" aria-hidden="true" />
              Ouvrir l'app
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
