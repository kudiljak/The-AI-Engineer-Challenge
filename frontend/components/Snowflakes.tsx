'use client';

import { useEffect, useState } from 'react';
import styles from './Snowflakes.module.css';

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  size: number;
}

export default function Snowflakes() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    // Create 50 snowflakes with random properties
    const flakes: Snowflake[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 3 + Math.random() * 4, // 3-7 seconds
      animationDelay: Math.random() * 2,
      size: 4 + Math.random() * 6, // 4-10px
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className={styles.snowflakesContainer}>
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className={styles.snowflake}
          style={{
            left: `${flake.left}%`,
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `${flake.animationDelay}s`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
}
