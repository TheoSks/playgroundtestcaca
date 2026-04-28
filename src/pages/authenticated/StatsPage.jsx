import { motion } from 'framer-motion';
import './StatsPage.css';

const playerStats = {
  name: 'Théo le Barbare',
  class: 'Guerrier',
  level: 14,
  xp: 4250,
  xpNext: 5000,
  stats: {
    force: 18,
    dexterite: 12,
    constitution: 16,
    intelligence: 8,
    sagesse: 10,
    charisme: 14,
  },
};

const gameStats = {
  totalGames: 47,
  wins: 31,
  winRate: 66,
  totalHours: 128,
  favoriteGame: 'Terraforming Mars',
  currentStreak: 4,
};

const recentGames = [
  { name: '7 Wonders', result: 'Victoire', date: '12 avr.', score: '82 pts', icon: '🏛️' },
  { name: 'Root', result: 'Défaite', date: '10 avr.', score: '24 pts', icon: '🦊' },
  { name: 'Catan', result: 'Victoire', date: '8 avr.', score: '10 pts', icon: '🏝️' },
  { name: 'Terraforming Mars', result: 'Victoire', date: '5 avr.', score: '71 pts', icon: '🪐' },
  { name: 'Azul', result: 'Victoire', date: '3 avr.', score: '89 pts', icon: '🎨' },
];

const leaderboard = [
  { rank: 1, name: 'Marie L.', wins: 42, avatar: '🧝‍♀️' },
  { rank: 2, name: 'Alex K.', wins: 38, avatar: '🧙‍♂️' },
  { rank: 3, name: 'Theo B.', wins: 31, isYou: true, avatar: '⚔️' },
  { rank: 4, name: 'Luna P.', wins: 28, avatar: '🌙' },
  { rank: 5, name: 'Samir M.', wins: 25, avatar: '🗡️' },
];

const achievements = [
  { id: 1, name: 'Premier sang', desc: 'Gagner sa première partie', icon: '🗡️', unlocked: true },
  { id: 2, name: 'Série imbattable', desc: '5 victoires d\'affilée', icon: '🔥', unlocked: true },
  { id: 3, name: 'Explorateur', desc: 'Jouer 10 jeux différents', icon: '🗺️', unlocked: true },
  { id: 4, name: 'Centurion', desc: '100 parties jouées', icon: '🏛️', unlocked: false },
  { id: 5, name: 'Légende', desc: 'Atteindre le niveau 20', icon: '👑', unlocked: false },
  { id: 6, name: 'Marathon', desc: 'Jouer 200h en tout', icon: '⏳', unlocked: false },
];

const charStats = [
  { label: 'FOR', key: 'force', color: 'var(--blushed-brick)' },
  { label: 'DEX', key: 'dexterite', color: 'var(--yellow-green)' },
  { label: 'CON', key: 'constitution', color: 'var(--sage-green)' },
  { label: 'INT', key: 'intelligence', color: 'var(--hunter-green)' },
  { label: 'SAG', key: 'sagesse', color: '#8db574' },
  { label: 'CHA', key: 'charisme', color: '#d58e64' },
];

const ring = (pct, color, r = 15.9155) => {
  const c = 2 * Math.PI * r;
  return { strokeDasharray: `${(pct / 100) * c} ${c}`, stroke: color };
};

const StatsPage = () => {
  const xpPct = (playerStats.xp / playerStats.xpNext) * 100;

  return (
    <div className="sp">
      <div className="sp__wrap container">

        {/* ══════ HERO BANNER ══════ */}
        <motion.section
          className="sp-hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="sp-hero__left">
            <p className="sp-hero__tag tag-chip">
              <i className="hgi-stroke hgi-dashboard-circle" aria-hidden="true" />
              tableau de bord
            </p>
            <div className="sp-hero__identity">
              <span className="sp-hero__avatar">⚔️</span>
              <div>
                <h1 className="sp-hero__name">{playerStats.name}</h1>
                <span className="sp-hero__class">{playerStats.class} · Niveau {playerStats.level}</span>
              </div>
            </div>
            <div className="sp-hero__xp">
              <div className="sp-hero__xp-head">
                <span>XP</span>
                <span>{playerStats.xp} / {playerStats.xpNext}</span>
              </div>
              <div className="sp-hero__xp-track">
                <motion.div
                  className="sp-hero__xp-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${xpPct}%` }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                />
              </div>
            </div>
          </div>

          <div className="sp-hero__rings">
            {charStats.map((s, i) => {
              const val = playerStats.stats[s.key];
              const pct = (val / 20) * 100;
              return (
                <motion.div
                  key={s.key}
                  className="sp-ring"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                >
                  <svg viewBox="0 0 36 36" className="sp-ring__svg">
                    <circle cx="18" cy="18" r="15.9155" className="sp-ring__bg" />
                    <motion.circle
                      cx="18" cy="18" r="15.9155"
                      className="sp-ring__fill"
                      style={{ stroke: s.color }}
                      initial={{ strokeDasharray: '0 100' }}
                      animate={{ strokeDasharray: `${pct} 100` }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.08 }}
                    />
                  </svg>
                  <span className="sp-ring__val">{val}</span>
                  <span className="sp-ring__label">{s.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ══════ BENTO GRID ══════ */}
        <div className="sp-bento">

          {/* ── Win rate donut ── */}
          <motion.div
            className="sp-cell sp-cell--winrate"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="sp-donut">
              <svg viewBox="0 0 36 36" className="sp-donut__svg">
                <circle cx="18" cy="18" r="15.9155" className="sp-donut__bg" />
                <motion.circle
                  cx="18" cy="18" r="15.9155"
                  className="sp-donut__fill"
                  initial={{ strokeDasharray: '0 100' }}
                  animate={{ strokeDasharray: `${gameStats.winRate} 100` }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                />
              </svg>
              <div className="sp-donut__center">
                <span className="sp-donut__pct">{gameStats.winRate}%</span>
                <span className="sp-donut__sub">win rate</span>
              </div>
            </div>
            <div className="sp-cell__row">
              <div className="sp-mini"><span className="sp-mini__val">{gameStats.wins}</span><span className="sp-mini__lbl">Victoires</span></div>
              <div className="sp-mini"><span className="sp-mini__val">{gameStats.totalGames - gameStats.wins}</span><span className="sp-mini__lbl">Défaites</span></div>
            </div>
          </motion.div>

          {/* ── Quick numbers ── */}
          <motion.div
            className="sp-cell sp-cell--numbers"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="sp-num">
              <i className="hgi-stroke hgi-book-open-01" aria-hidden="true" />
              <strong>{gameStats.totalGames}</strong>
              <span>Parties</span>
            </div>
            <div className="sp-num">
              <i className="hgi-stroke hgi-clock-01" aria-hidden="true" />
              <strong>{gameStats.totalHours}h</strong>
              <span>Jouées</span>
            </div>
            <div className="sp-num">
              <i className="hgi-stroke hgi-fire" aria-hidden="true" />
              <strong>{gameStats.currentStreak}W</strong>
              <span>Série</span>
            </div>
            <div className="sp-num">
              <i className="hgi-stroke hgi-star" aria-hidden="true" />
              <strong>#3</strong>
              <span>Rang</span>
            </div>
          </motion.div>

          {/* ── Timeline recent games ── */}
          <motion.div
            className="sp-cell sp-cell--timeline"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="sp-cell__title">
              <i className="hgi-stroke hgi-clock-01" aria-hidden="true" />
              Historique
            </h3>
            <div className="sp-timeline">
              {recentGames.map((g, i) => (
                <motion.div
                  key={g.name + g.date}
                  className="sp-tl-item"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                >
                  <div className={`sp-tl-dot ${g.result === 'Victoire' ? 'sp-tl-dot--win' : 'sp-tl-dot--loss'}`} />
                  <div className="sp-tl-body">
                    <div className="sp-tl-head">
                      <span className="sp-tl-icon">{g.icon}</span>
                      <span className="sp-tl-name">{g.name}</span>
                      <span className="sp-tl-date">{g.date}</span>
                    </div>
                    <div className="sp-tl-foot">
                      <span className="sp-tl-score">{g.score}</span>
                      <span className={`sp-tl-result ${g.result === 'Victoire' ? 'sp-tl-result--win' : 'sp-tl-result--loss'}`}>{g.result}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Podium leaderboard ── */}
          <motion.div
            className="sp-cell sp-cell--podium"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <h3 className="sp-cell__title">
              <i className="hgi-stroke hgi-star" aria-hidden="true" />
              Classement
            </h3>

            <div className="sp-podium">
              {[leaderboard[1], leaderboard[0], leaderboard[2]].map((p, i) => {
                const heights = [72, 96, 56];
                const medals = ['🥈', '🥇', '🥉'];
                return (
                  <motion.div
                    key={p.name}
                    className={`sp-podium__col ${p.isYou ? 'sp-podium__col--you' : ''}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  >
                    <span className="sp-podium__avatar">{p.avatar}</span>
                    <span className="sp-podium__name">{p.name}</span>
                    <div className="sp-podium__bar" style={{ height: heights[i] }}>
                      <span className="sp-podium__medal">{medals[i]}</span>
                      <span className="sp-podium__wins">{p.wins}W</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="sp-ranks">
              {leaderboard.slice(3).map((p) => (
                <div key={p.name} className="sp-rank-row">
                  <span className="sp-rank-row__pos">#{p.rank}</span>
                  <span className="sp-rank-row__av">{p.avatar}</span>
                  <span className="sp-rank-row__name">{p.name}</span>
                  <span className="sp-rank-row__wins">{p.wins}W</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Fav game ── */}
          <motion.div
            className="sp-cell sp-cell--fav"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className="sp-fav__emoji">🪐</span>
            <span className="sp-fav__label">Jeu favori</span>
            <strong className="sp-fav__name">{gameStats.favoriteGame}</strong>
            <span className="sp-fav__sub">14 parties · 71% wins · 38h</span>
          </motion.div>

          {/* ── Achievements ── */}
          <motion.div
            className="sp-cell sp-cell--achieve"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <h3 className="sp-cell__title">
              <i className="hgi-stroke hgi-award-01" aria-hidden="true" />
              Hauts faits
              <span className="sp-achieve__count">{achievements.filter((a) => a.unlocked).length}/{achievements.length}</span>
            </h3>
            <div className="sp-badges">
              {achievements.map((a, i) => (
                <motion.div
                  key={a.id}
                  className={`sp-badge ${a.unlocked ? 'sp-badge--on' : 'sp-badge--off'}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                  title={a.desc}
                >
                  <span className="sp-badge__icon">{a.icon}</span>
                  <span className="sp-badge__name">{a.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default StatsPage;
