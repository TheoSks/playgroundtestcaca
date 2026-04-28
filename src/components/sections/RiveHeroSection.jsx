import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import './RiveHeroSection.css';

const RiveHeroSection = ({ onReady }) => {
  const { RiveComponent } = useRive({
    src: '/parallax.playground.gobelin.riv',
    stateMachines: 'State Machine 1',
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
    onLoad: () => onReady?.(),
  });

  return (
    <section className="rive-hero-section snap-section" id="hero" aria-label="Hero animation Playground">
      <RiveComponent className="rive-hero-section__canvas" />
    </section>
  );
};

export default RiveHeroSection;