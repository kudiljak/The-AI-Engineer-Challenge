'use client';

import { useEffect, useState } from 'react';
import styles from './CherryBlossoms.module.css';

interface Petal {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  size: number;
  rotation: number;
}

export default function CherryBlossoms() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Create 30 cherry blossom petals with random properties
    const blossomPetals: Petal[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 8 + Math.random() * 12, // 8-20 seconds
      animationDelay: Math.random() * 5,
      size: 8 + Math.random() * 12, // 8-20px
      rotation: Math.random() * 360,
    }));
    setPetals(blossomPetals);
  }, []);

  return (
    <div className={styles.petalsContainer}>
      {petals.map((petal) => (
        <div
          key={petal.id}
          className={styles.petal}
          style={{
            left: `${petal.left}%`,
            animationDuration: `${petal.animationDuration}s`,
            animationDelay: `${petal.animationDelay}s`,
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            transform: `rotate(${petal.rotation}deg)`,
          }}
        >
          🌸
        </div>
      ))}
    </div>
  );
}
