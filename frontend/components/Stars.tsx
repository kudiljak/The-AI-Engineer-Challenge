'use client';

import { useEffect, useState } from 'react';
import styles from './Stars.module.css';

interface Star {
  id: number;
  left: number;
  top: number;
  animationDuration: number;
  animationDelay: number;
  size: number;
  opacity: number;
}

export default function Stars() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Create 100 stars with random properties for a starfield effect
    const starField: Star[] = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDuration: 2 + Math.random() * 3, // 2-5 seconds
      animationDelay: Math.random() * 2,
      size: 1 + Math.random() * 2, // 1-3px
      opacity: 0.3 + Math.random() * 0.7, // 0.3-1.0
    }));
    setStars(starField);
  }, []);

  return (
    <div className={styles.starsContainer}>
      {stars.map((star) => (
        <div
          key={star.id}
          className={styles.star}
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            animationDuration: `${star.animationDuration}s`,
            animationDelay: `${star.animationDelay}s`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  );
}
