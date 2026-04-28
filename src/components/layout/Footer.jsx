import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer snap-section" id="contact">
      <div className="footer__inner container">
        <motion.div
          className="footer__hero"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="footer__kicker">Playground Bordeaux</p>
          <h2 className="footer__title">
            <span className="decorative">Table ouverte.</span>
            Dernier round ?
          </h2>
          <a href="/app/order" className="btn btn--accent btn--pill btn--large cursor-target">
            <i className="hgi-stroke hgi-cursor-click-01" aria-hidden="true" />
            Commander depuis l'app
          </a>
        </motion.div>

        <div className="footer__grid">
          <article className="footer__card">
            <h3 className="footer__card-title">
              <i className="hgi-stroke hgi-clock-01" aria-hidden="true" />
              Horaires
            </h3>
            <p>Mar au Jeudi : 16h00 - 00h00</p>
            <p>Vendredi : 16h00 - 02h00</p>
            <p>Samedi : 14h00 - 02h00</p>
            <p>Dimanche : 14h00 - 22h00</p>
          </article>

          <article className="footer__card">
            <h3 className="footer__card-title">
              <i className="hgi-stroke hgi-location-01" aria-hidden="true" />
              Adresse
            </h3>
            <p>42 rue Saint-Remi</p>
            <p>33000 Bordeaux</p>
            <p>contact@playground-bordeaux.fr</p>
            <a className="footer__mini-link cursor-target" href="/#events">Voir les evenements</a>
          </article>

          <article className="footer__card">
            <h3 className="footer__card-title">
              <i className="hgi-stroke hgi-share-01" aria-hidden="true" />
              Suivez Playground
            </h3>
            <div className="footer__socials">
              <a href="#" className="footer__social cursor-target" aria-label="Instagram">
                <i className="hgi-stroke hgi-share-01" aria-hidden="true" />
              </a>
              <a href="#" className="footer__social cursor-target" aria-label="Discord">
                <i className="hgi-stroke hgi-message-01" aria-hidden="true" />
              </a>
              <a href="#" className="footer__social cursor-target" aria-label="TikTok">
                <i className="hgi-stroke hgi-smartphone-01" aria-hidden="true" />
              </a>
            </div>
            <p className="footer__small">News hebdo, campagnes ouvertes, et tournois en direct.</p>
          </article>
        </div>

        <div className="footer__bottom">© 2026 Playground Bordeaux. Prototype web app.</div>
      </div>
    </footer>
  );
};

export default Footer;
