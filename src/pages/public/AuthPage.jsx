import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../../context/UserContext';
import './AuthPage.css';

const floaters = [
  { id: 1, cls: 'auth-floater--1', icon: 'hgi-sword-01', label: '+10 ATK', sfx: 'slash' },
  { id: 2, cls: 'auth-floater--2', icon: 'hgi-fire', label: '+5 FIRE', sfx: 'burn' },
  { id: 3, cls: 'auth-floater--3', icon: 'hgi-star', label: '+25 XP', sfx: 'sparkle' },
  { id: 4, cls: 'auth-floater--4', icon: 'hgi-shield-01', label: 'BLOCK!', sfx: 'shield' },
  { id: 5, cls: 'auth-floater--5', icon: 'hgi-dice', label: 'NAT 20!', sfx: 'crit' },
  { id: 6, cls: 'auth-floater--6', icon: 'hgi-magic-wand-01', label: '+15 MANA', sfx: 'magic' },
];

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ pseudo: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [pops, setPops] = useState([]);
  const navigate = useNavigate();
  const { login } = useUser();

  const handlePop = useCallback((id, label) => {
    const popId = `${id}-${Date.now()}`;
    setPops((prev) => [...prev, { popId, label }]);
    setTimeout(() => setPops((prev) => prev.filter((p) => p.popId !== popId)), 800);
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      setError('Remplis tous les champs requis.');
      return;
    }
    if (!isLogin && !form.pseudo.trim()) {
      setError('Choisis un pseudo pour rejoindre la partie.');
      return;
    }

    login({
      pseudo: form.pseudo || form.email.split('@')[0],
      email: form.email,
      avatar: `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(form.pseudo || form.email)}`,
    });
    navigate('/app/order');
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  const switchVariants = {
    hidden: { opacity: 0, x: isLogin ? -30 : 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, x: isLogin ? 30 : -30, transition: { duration: 0.25 } },
  };

  return (
    <div className="auth-page">
      <div className="auth-page__bg-shapes">
        {floaters.map((f) => (
          <motion.div
            key={f.id}
            className={`auth-floater ${f.cls} cursor-target`}
            drag
            dragConstraints={{ top: -40, bottom: 40, left: -40, right: 40 }}
            dragElastic={0.35}
            whileHover={{
              scale: 1.3,
              rotate: [0, -12, 12, -6, 0],
              boxShadow: '0 0 20px rgba(56,102,65,0.4), 6px 6px 0 var(--color-ink)',
              transition: { duration: 0.4, ease: 'easeOut' },
            }}
            whileTap={{
              scale: 0.7,
              rotate: 360,
              transition: { type: 'spring', stiffness: 500, damping: 15 },
            }}
            onTap={() => handlePop(f.id, f.label)}
          >
            <i className={`hgi-stroke ${f.icon}`} aria-hidden="true" />
          </motion.div>
        ))}

        <AnimatePresence>
          {pops.map((p) => (
            <motion.span
              key={p.popId}
              className="auth-pop"
              initial={{ opacity: 1, y: 0, scale: 0.6 }}
              animate={{ opacity: 0, y: -60, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              {p.label}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        className="auth-card card-brutal"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="auth-card__header">
          <p className="tag-chip auth-card__chip">
            <i className="hgi-stroke hgi-cursor-click-01" aria-hidden="true" />
            playground app
          </p>
          <h1 className="auth-card__title">
            <AnimatePresence mode="wait">
              <motion.span
                key={isLogin ? 'login' : 'register'}
                variants={switchVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ display: 'inline-block' }}
              >
                {isLogin ? (
                  <><span className="decorative">Connexion</span> joueur</>
                ) : (
                  <><span className="decorative">Inscription</span> nouvelle partie</>
                )}
              </motion.span>
            </AnimatePresence>
          </h1>
          <p className="auth-card__subtitle">
            {isLogin
              ? 'Entre tes identifiants pour rejoindre ta table.'
              : 'Cree ton compte et lance ta premiere commande.'}
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login-fields' : 'register-fields'}
              variants={switchVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {!isLogin && (
                <div className="auth-form__field">
                  <label htmlFor="pseudo" className="auth-form__label">
                    <i className="hgi-stroke hgi-user" aria-hidden="true" />
                    Pseudo
                  </label>
                  <input
                    id="pseudo"
                    name="pseudo"
                    type="text"
                    className="auth-form__input"
                    placeholder="Ex: GoblinMaster42"
                    value={form.pseudo}
                    onChange={handleChange}
                    autoComplete="username"
                  />
                </div>
              )}

              <div className="auth-form__field">
                <label htmlFor="email" className="auth-form__label">
                  <i className="hgi-stroke hgi-mail-01" aria-hidden="true" />
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="auth-form__input"
                  placeholder="joueur@playground.gg"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>

              <div className="auth-form__field">
                <label htmlFor="password" className="auth-form__label">
                  <i className="hgi-stroke hgi-lock" aria-hidden="true" />
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="auth-form__input"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {error && (
            <motion.p
              className="auth-form__error"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <i className="hgi-stroke hgi-alert-circle" aria-hidden="true" />
              {error}
            </motion.p>
          )}

          <button type="submit" className="btn btn--primary btn--large btn--pill auth-form__submit cursor-target">
            <i className="hgi-stroke hgi-login-01" aria-hidden="true" />
            {isLogin ? 'Se connecter' : "Creer mon compte"}
          </button>
        </form>

        <div className="auth-card__footer">
          <span className="auth-card__footer-text">
            {isLogin ? 'Pas encore de compte ?' : 'Deja inscrit ?'}
          </span>
          <button
            type="button"
            className="auth-card__toggle cursor-target"
            onClick={() => {
              setIsLogin((v) => !v);
              setError('');
            }}
          >
            {isLogin ? "S'inscrire" : 'Se connecter'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
