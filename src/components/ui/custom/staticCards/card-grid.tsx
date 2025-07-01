import { motion } from 'framer-motion';
import React from 'react';

import { StatsCard, StatsCardProps } from './card';

interface CardGridProps {
  cards: StatsCardProps[];
}

const CardGrid: React.FC<CardGridProps> = ({ cards }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {cards.map((card) => (
        <StatsCard key={card.title} {...card} />
      ))}
    </motion.div>
  );
};

export default CardGrid;
