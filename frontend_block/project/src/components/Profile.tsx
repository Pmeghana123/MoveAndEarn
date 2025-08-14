import React from 'react';
import { User, Award, TrendingUp, Calendar, Coins, Settings } from 'lucide-react';
import { useFitness } from '../context/FitnessContext';
import { useWallet } from '../context/WalletContext';

const Profile: React.FC = () => {
  const { fitnessData } = useFitness();
  const { account } = useWallet();

  const achievements = [
    { id: 1, title: 'First Steps', desc: 'Completed your first 100 steps', date: '2025-01-01', unlocked: true },
    { id: 2, title: 'Walking Warrior', desc: 'Reached 1,000 total steps', date: '2025-01-02', unlocked: true },
    { id: 3, title: '10K Champion', desc: 'Hit 10,000 steps in a single day', date: '2025-01-03', unlocked: fitnessData.dailySteps >= 10000 },
    { id: 4, title: 'Streak Master', desc: 'Maintained a 7-day streak', date: '-', unlocked: fitnessData.streakDays >= 7 },
    { id: 5, title: 'Coin Collector', desc: 'Earned 1,000 total coins', date: '-', unlocked: fitnessData.totalCoinsEarned >= 1000 },
    { id: 6, title: 'Marathon Walker', desc: 'Walked 100,000 total steps', date: '-', unlocked: fitnessData.totalSteps >= 100000 },
  ];

  const stats = [
    { label: 'Total Steps', value: fitnessData.totalSteps.toLocaleString(), icon: TrendingUp },
    { label: 'Total Calories', value: fitnessData.totalCalories.toLocaleString(), icon: TrendingUp },
    { label: 'Total Coins Earned', value: fitnessData.totalCoinsEarned.toLocaleString(), icon: Coins },
    { label: 'Current Streak', value: `${fitnessData.streakDays} days`, icon: Calendar },
  ];

  if (!account) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <User className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Connect Your Wallet</h2>
        <p className="text-gray-600">Connect your wallet to view your fitness profile and achievements</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="bg-white/20 rounded-full p-4 backdrop-blur-sm">
            <User className="w-12 h-12 text-white" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold mb-2">Fitness Profile</h1>
            <p className="opacity-90 mb-2">
              Wallet: {account.address.slice(0, 6)}...{account.address.slice(-4)}
            </p>
            <div className="flex items-center justify-center md:justify-start space-x-4 text-sm">
              <span>Member since Jan 2025</span>
              <span>•</span>
              <span>Level {Math.floor(fitnessData.totalSteps / 10000) + 1}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="w-6 h-6 text-blue-500" />
              <div className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                All Time
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <Award className="w-6 h-6 text-yellow-500 mr-2" />
            Achievements
          </h2>
          <div className="text-sm text-gray-600">
            {achievements.filter(a => a.unlocked).length}/{achievements.length} Unlocked
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                achievement.unlocked
                  ? 'border-yellow-200 bg-yellow-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className={`text-2xl mb-2 ${achievement.unlocked ? '' : 'grayscale'}`}>
                🏆
              </div>
              <h3 className={`font-semibold mb-1 ${
                achievement.unlocked ? 'text-yellow-700' : 'text-gray-500'
              }`}>
                {achievement.title}
              </h3>
              <p className={`text-sm mb-2 ${
                achievement.unlocked ? 'text-yellow-600' : 'text-gray-400'
              }`}>
                {achievement.desc}
              </p>
              {achievement.unlocked && achievement.date !== '-' && (
                <div className="text-xs text-yellow-600">
                  Unlocked: {achievement.date}
                </div>
              )}
              {!achievement.unlocked && (
                <div className="text-xs text-gray-400">🔒 Locked</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { type: 'steps', desc: `Recorded ${fitnessData.dailySteps} steps today`, time: '2 hours ago', icon: '🚶‍♂️' },
            { type: 'achievement', desc: 'Unlocked "Walking Warrior" achievement', time: '1 day ago', icon: '🏆' },
            { type: 'coins', desc: 'Earned 150 coins from daily activity', time: '1 day ago', icon: '💰' },
            { type: 'streak', desc: `Extended streak to ${fitnessData.streakDays} days`, time: '2 days ago', icon: '🔥' },
          ].map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="text-xl">{activity.icon}</div>
              <div className="flex-1">
                <div className="text-gray-900 font-medium">{activity.desc}</div>
                <div className="text-sm text-gray-500">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Settings className="w-6 h-6 text-gray-600 mr-2" />
          Settings
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div>
              <div className="font-medium text-gray-900">Daily Step Goal</div>
              <div className="text-sm text-gray-600">Current goal: 10,000 steps</div>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-medium">Edit</button>
          </div>
          
          <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div>
              <div className="font-medium text-gray-900">Notifications</div>
              <div className="text-sm text-gray-600">Get reminders to stay active</div>
            </div>
            <div className="bg-green-500 w-10 h-6 rounded-full relative">
              <div className="bg-white w-4 h-4 rounded-full absolute right-1 top-1"></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div>
              <div className="font-medium text-gray-900">Data Privacy</div>
              <div className="text-sm text-gray-600">Manage your data sharing preferences</div>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-medium">Manage</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;