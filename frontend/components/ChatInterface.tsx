'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './ChatInterface.module.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.content }),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to get response';
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorData.message || errorMessage;
        } catch (parseError) {
          // If response is not JSON, try to get text
          const textError = await response.text().catch(() => '');
          errorMessage = textError || `Server returned ${response.status}: ${response.statusText}`;
        }
        
        // Provide helpful error messages
        if (response.status === 0 || response.status === 500) {
          if (errorMessage.includes('OPENAI_API_KEY')) {
            errorMessage = 'Backend error: OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.';
          } else if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
            errorMessage = 'Cannot connect to backend. Please make sure the backend is running on http://localhost:8000';
          }
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      let errorMessage = 'An error occurred';
      if (err instanceof TypeError && err.message.includes('fetch')) {
        errorMessage = 'Cannot connect to backend. Please make sure the backend is running on http://localhost:8000. Start it with: uv run uvicorn api.index:app --reload';
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      console.error('Error sending message:', err);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesContainer}>
        {messages.length === 0 && (
          <div className={styles.welcomeMessage}>
            <div className={styles.welcomeIcon}>🚀</div>
            <h2>Welcome to Space NASA Chat!</h2>
            <p>
              I'm here to support you as your mental coach. Feel free to share
              what's on your mind - whether it's stress, motivation, habits, or
              building confidence. I'm here to help! 🌟
            </p>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${
              message.role === 'user' ? styles.userMessage : styles.assistantMessage
            }`}
          >
            <div className={styles.messageContent}>
              <div className={styles.messageRole}>
                {message.role === 'user' ? 'You' : 'Coach'}
              </div>
              <div className={styles.messageText}>{message.content}</div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className={`${styles.message} ${styles.assistantMessage}`}>
            <div className={styles.messageContent}>
              <div className={styles.messageRole}>Coach</div>
              <div className={styles.loadingDots}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        {error && (
          <div className={styles.errorMessage}>
            <span className={styles.errorIcon}>⚠️</span>
            <span>Error: {error}</span>
            <button
              className={styles.retryButton}
              onClick={() => setError(null)}
            >
              Dismiss
            </button>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputContainer}>
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
          className={styles.input}
          rows={1}
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || isLoading}
          className={styles.sendButton}
          aria-label="Send message"
        >
          {isLoading ? '⏳' : '🚀'}
        </button>
      </div>
    </div>
  );
}
