import React, { useState, useEffect } from 'react';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { isLoggedIn } from './lib/adminApi';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  if (!loggedIn) {
    return <LoginPage onLogin={() => setLoggedIn(true)} />;
  }

  return <DashboardPage onLogout={() => setLoggedIn(false)} />;
}
