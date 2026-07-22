import React from 'react';
import { motion } from 'framer-motion';

interface PageHeroProps {
  title: string;
  subtitle: string;
  imageSrc: string;
}

const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, imageSrc }) => {
  return (
    <section className="relative h-[65vh] min-h-[420px] overflow-hidden flex items-center justify-center">
      {/* Background Image with Zoom Animation */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover object-center brightness-[1.05]"
        />
        {/* Lighter overlay so the background image stays clear and visible */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(10,10,30,0.45), rgba(26,35,126,0.35))' }}
        />
      </motion.div>

      {/* Text Content with Staggered Fade Up */}
      <div className="relative z-10 text-center px-4 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-white text-5xl md:text-7xl font-black tracking-[0.25em] uppercase drop-shadow-lg"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="font-bold tracking-widest text-sm md:text-base mt-4 uppercase"
          style={{ color: '#C9A84C' }}
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
};

export default PageHero;
