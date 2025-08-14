import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import { FitnessProvider } from './context/FitnessContext';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import StepTracker from './components/StepTracker';
import RewardsCenter from './components/RewardsCenter';
import Profile from './components/Profile';
import './index.css';

function App() {
  return (
    <WalletProvider>
      <FitnessProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
            <Header />
            <main className="container mx-auto px-4 py-6 max-w-7xl">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tracker" element={<StepTracker />} />
                <Route path="/rewards" element={<RewardsCenter />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
          </div>
        </Router>
      </FitnessProvider>
    </WalletProvider>
  );
}

export default App;