'use client';

import { useState, useRef, useEffect } from 'react';
import ChatInterface from '@/components/ChatInterface';
import Stars from '@/components/Stars';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <Stars />
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            🚀 Space NASA Chat 🚀
          </h1>
          <p className={styles.subtitle}>
            Your supportive mental coach is here to help
          </p>
        </header>
        <ChatInterface />
      </div>
    </main>
  );
}
