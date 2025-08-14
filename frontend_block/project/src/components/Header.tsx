import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Coins, Trophy, User, Wallet } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import ConnectWallet from './ConnectWallet';

const Header: React.FC = () => {
  const location = useLocation();
  const { account } = useWallet();

  const navItems = [
    { path: '/', icon: Activity, label: 'Dashboard' },
    { path: '/tracker', icon: Activity, label: 'Tracker' },
    { path: '/rewards', icon: Trophy, label: 'Rewards' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-xl">
              <Coins className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                FitnessCoin
              </h1>
              <p className="text-xs text-gray-500">Move & Earn</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                  location.pathname === path
                    ? 'bg-green-100 text-green-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-3">
            {account ? (
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-xl border border-green-200">
                <Wallet className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">
                  {truncateAddress(account.address)}
                </span>
              </div>
            ) : (
              <ConnectWallet />
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-3 flex items-center justify-around">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                location.pathname === path
                  ? 'text-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;