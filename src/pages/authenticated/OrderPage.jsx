import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './OrderPage.css';

const menuCategories = [
  { id: 'boissons', label: 'Boissons', icon: 'hgi-fire' },
  { id: 'cocktails', label: 'Signature', icon: 'hgi-star' },
  { id: 'snacks', label: 'Snacks', icon: 'hgi-layers-01' },
  { id: 'planches', label: 'Planches', icon: 'hgi-book-open-01' },
];

const menuItems = {
  boissons: [
    { id: 1, name: 'La Mousse du Forgeron', price: 5.50, desc: 'IPA artisanale brassée en donjon — amère, houblonnée, loyale', img: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&h=220&fit=crop&q=80' },
    { id: 2, name: 'Nectar de la Forêt Ancienne', price: 4.50, desc: 'Cidre fermier trouble, cueilli avant le dernier voile de lune', img: 'https://images.unsplash.com/photo-1576425531941-4e5344264d7c?w=400&h=220&fit=crop&q=80' },
    { id: 3, name: 'Eau Vive Runique', price: 3.50, desc: 'Limonade gravée de menthe, citron & gingembre sauvage', img: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=220&fit=crop&q=80' },
    { id: 4, name: 'Élixir Solaire', price: 3.00, desc: 'Thé glacé pêche infusé à l\'aube, refroidi sous la dalle', img: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=400&h=220&fit=crop&q=80' },
    { id: 5, name: 'Noir de Corbeau', price: 2.00, desc: 'Expresso de torréfaction artisanale — aussi sombre que la Crypte', img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=220&fit=crop&q=80' },
    { id: 6, name: 'Sang Chaud du Grizzly', price: 3.50, desc: 'Chocolat 70% fondu au coin du feu, avant l\'assaut final', img: 'https://images.unsplash.com/photo-1517578239113-b03992dcdd25?w=400&h=220&fit=crop&q=80' },
  ],
  cocktails: [
    { id: 7, name: 'Protocole 404', price: 9.50, desc: 'Vodka, curaçao bleu, lychee, eau tonique — quand le réseau trahit', img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=220&fit=crop&q=80' },
    { id: 8, name: 'Encens du Chamane', price: 9.00, desc: 'Mezcal fumé, miel sauvage, piment & citron — rituel de survie', img: 'https://images.unsplash.com/photo-1560508180-03f285f67ded?w=400&h=220&fit=crop&q=80' },
    { id: 9, name: 'Témoin Silencieux', price: 8.50, desc: 'Gin, crème de cassis, concombre, tonic — l\'indice était là depuis le début', img: 'https://images.unsplash.com/photo-1571950006852-3d3a22ec3d4c?w=400&h=220&fit=crop&q=80' },
    { id: 10, name: 'Sang de Dragon', price: 9.50, desc: 'Vodka, grenadine, orange sanguine — à boire avant le combat final', img: 'https://images.unsplash.com/photo-1563804447971-6e113ab80713?w=400&h=220&fit=crop&q=80' },
    { id: 11, name: 'Brise Elfique', price: 8.00, desc: 'Prosecco, sureau, menthe fraîche — une trêve entre deux batailles', img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=220&fit=crop&q=80' },
    { id: 12, name: 'Potion du Mage', price: 9.00, desc: 'Rhum, curaçao, citron vert, sirop de violette — +2 en sagesse', img: 'https://images.unsplash.com/photo-1606107613572-a2e81cff9ee3?w=400&h=220&fit=crop&q=80' },
  ],
  snacks: [
    { id: 13, name: 'Rations de Campagne', price: 7.50, desc: 'Nachos rescapés, guacamole de bunker, cheddar fondu en urgence', img: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&h=220&fit=crop&q=80' },
    { id: 14, name: 'Trophées du Chasseur', price: 6.50, desc: 'Nuggets croustillants ramenés de la chasse, sauce BBQ du manoir', img: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&h=220&fit=crop&q=80' },
    { id: 15, name: 'Street Food Néo-Tokyo', price: 5.00, desc: 'Frites patate douce, mayo truffée servie dans le district 7', img: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=400&h=220&fit=crop&q=80' },
    { id: 16, name: 'Archives Gastronomiques', price: 6.00, desc: 'Bruschetta trio façon banquet médiéval — tomate, chèvre-miel, tapenade', img: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=220&fit=crop&q=80' },
  ],
  planches: [
    { id: 17, name: 'La Quête du Ravitaillement', price: 14.00, desc: 'Fromages locaux, charcuteries de campagne, fruits secs pillés en chemin', img: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&h=220&fit=crop&q=80' },
    { id: 18, name: 'Le Jardin des Druides', price: 12.00, desc: 'Houmous ancien, légumes grillés sur bûcher, olives & pain des forêts', img: 'https://images.unsplash.com/photo-1529059997568-3d847b1154f0?w=400&h=220&fit=crop&q=80' },
    { id: 19, name: 'Récompense du Donjon', price: 10.00, desc: 'Fruits frais du butin, chocolat noir & madeleines de la sorcière', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=220&fit=crop&q=80' },
  ],
};

const tables = [
  { id: 'T-01', label: 'T-01 / Salle Donjon' },
  { id: 'T-02', label: 'T-02 / Salle Donjon' },
  { id: 'T-03', label: 'T-03 / Salle Donjon' },
  { id: 'T-04', label: 'T-04 / Salle Arène' },
  { id: 'T-05', label: 'T-05 / Salle Arène' },
  { id: 'T-06', label: 'T-06 / Salle Arène' },
  { id: 'T-07', label: 'T-07 / Salle Donjon' },
  { id: 'T-08', label: 'T-08 / Salle Taverne' },
  { id: 'T-09', label: 'T-09 / Salle Taverne' },
  { id: 'T-10', label: 'T-10 / VIP Crypte' },
];

const OrderPage = () => {
  const [activeCategory, setActiveCategory] = useState('boissons');
  const [cart, setCart] = useState([]);
  const [selectedTable] = useState('T-07');

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.reduce((acc, c) => {
      if (c.id === id) { if (c.qty > 1) acc.push({ ...c, qty: c.qty - 1 }); }
      else acc.push(c);
      return acc;
    }, []));
  };

  const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const totalItems = cart.reduce((sum, c) => sum + c.qty, 0);
  const prepTime = totalItems === 0 ? '0 min' : `${10 + totalItems * 2} min`;
  const serviceMode = totalItems > 0 ? 'En preparation' : 'Pret a commander';

  return (
    <div className="order-page">
      <div className="order-page__content container">
        <motion.div
          className="order-page__header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="order-page__eyebrow tag-chip">
            <i className="hgi-stroke hgi-clipboard" aria-hidden="true" />
            app playground
          </p>
          <h1 className="order-page__title">
            <span className="decorative">Commande</span> sans quitter la partie
          </h1>
          <p className="order-page__subtitle">Commande live depuis ta table, sans perdre le rythme de jeu.</p>
        </motion.div>

        <motion.div
          className="order-page__meta"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <article className="order-meta-card cursor-target">
            <i className="hgi-stroke hgi-location-01" aria-hidden="true" />
            <div>
              <span>Table active</span>
              <strong>{tables.find(t => t.id === selectedTable)?.label ?? '—'}</strong>
            </div>
          </article>
          <article className="order-meta-card cursor-target">
            <i className="hgi-stroke hgi-clock-01" aria-hidden="true" />
            <div>
              <span>Delai estime</span>
              <strong>{prepTime}</strong>
            </div>
          </article>
          <article className="order-meta-card cursor-target">
            <i className="hgi-stroke hgi-notification-03" aria-hidden="true" />
            <div>
              <span>Etat service</span>
              <strong>{serviceMode}</strong>
            </div>
          </article>
        </motion.div>

        <div className="order-tabs">
          {menuCategories.map((cat) => (
            <motion.button
              key={cat.id}
              className={`order-tab cursor-target ${activeCategory === cat.id ? 'order-tab--active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
              whileTap={{ scale: 0.95 }}
            >
              <i className={`hgi-stroke ${cat.icon}`} aria-hidden="true" />
              <span className="order-tab__label">{cat.label}</span>
            </motion.button>
          ))}
        </div>

        <div className="order-page__body">
          <div className="order-menu">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                className="order-menu__grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {menuItems[activeCategory].map((item, i) => {
                    const cartItem = cart.find(c => c.id === item.id);
                    return (
                      <motion.div
                        key={item.id}
                        className="menu-item cursor-target"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ y: -4 }}
                      >
                        <div className="menu-item__img-wrap">
                          <img src={item.img} alt={item.name} className="menu-item__img" loading="lazy" />
                          <span className="menu-item__type">{menuCategories.find((cat) => cat.id === activeCategory)?.label}</span>

                        </div>
                        <div className="menu-item__body">
                          <div className="menu-item__info">
                            <h3 className="menu-item__name">{item.name}</h3>
                            <p className="menu-item__desc">{item.desc}</p>
                          </div>
                          <div className="menu-item__footer">
                            <div className="menu-item__price">{item.price.toFixed(2)} €</div>
                            <AnimatePresence mode="wait">
                              {cartItem ? (
                                <motion.div
                                  key="stepper"
                                  className="menu-item__stepper"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.8 }}
                                  transition={{ duration: 0.15 }}
                                >
                                  <motion.button
                                    className="menu-item__stepper-btn cursor-target"
                                    onClick={(e) => { e.stopPropagation(); removeFromCart(item.id); }}
                                    whileTap={{ scale: 0.8 }}
                                    aria-label="Retirer"
                                  >−</motion.button>
                                  <span className="menu-item__stepper-qty">{cartItem.qty}</span>
                                  <motion.button
                                    className="menu-item__stepper-btn cursor-target"
                                    onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                                    whileTap={{ scale: 0.8 }}
                                    aria-label="Ajouter"
                                  >+</motion.button>
                                </motion.div>
                              ) : (
                                <motion.button
                                  key="add"
                                  className="menu-item__add cursor-target"
                                  onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                                  whileTap={{ scale: 0.8 }}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.8 }}
                                  transition={{ duration: 0.15 }}
                                  aria-label={`Ajouter ${item.name}`}
                                >
                                  <i className="hgi-stroke hgi-add-01" aria-hidden="true" />
                                </motion.button>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="order-cart">
            <div className="order-cart__header">
              <h3 className="order-cart__title">Panier</h3>
              <span className="order-cart__count">{totalItems}</span>
            </div>

            <p className="order-cart__hint">
              <i className="hgi-stroke hgi-information-circle" aria-hidden="true" />
              Une commande par table, paiement a la fin de session.
            </p>

            {cart.length === 0 ? (
              <div className="order-cart__empty">
                <i className="hgi-stroke hgi-clipboard" aria-hidden="true" />
                <p>Votre panier est vide</p>
              </div>
            ) : (
              <>
                <div className="order-cart__items">
                  <AnimatePresence>
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        className="cart-item"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="cart-item__info">
                          <span className="cart-item__name">{item.name}</span>
                          <span className="cart-item__price">{(item.price * item.qty).toFixed(2)} EUR</span>
                        </div>
                        <div className="cart-item__controls">
                          <button className="cart-item__btn cursor-target" onClick={() => removeFromCart(item.id)}>
                            -
                          </button>
                          <span className="cart-item__qty">{item.qty}</span>
                          <button className="cart-item__btn cursor-target" onClick={() => addToCart(item)}>+</button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="order-cart__footer">
                  <div className="order-cart__total">
                    <span>Total</span>
                    <span className="order-cart__total-price">{total.toFixed(2)} EUR</span>
                  </div>
                  <motion.button
                    className="btn btn--accent btn--large order-cart__submit cursor-target"
                    whileTap={{ scale: 0.95 }}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <i className="hgi-stroke hgi-credit-card" aria-hidden="true" />
                    Valider la commande
                  </motion.button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
