import React from 'react';
import { Activity, Coins, Flame, Target, TrendingUp, Award } from 'lucide-react';
import { useFitness } from '../context/FitnessContext';
import { useWallet } from '../context/WalletContext';
import StepCounter from './StepCounter';

const Dashboard: React.FC = () => {
  const { fitnessData, isLoading } = useFitness();
  const { account } = useWallet();

  const statsCards = [
    {
      title: 'Total Steps',
      value: fitnessData.totalSteps.toLocaleString(),
      icon: Activity,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Calories Burned',
      value: fitnessData.totalCalories.toLocaleString(),
      icon: Flame,
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600'
    },
    {
      title: 'Coins Earned',
      value: fitnessData.coinsBalance.toLocaleString(),
      icon: Coins,
      color: 'from-yellow-500 to-amber-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Daily Goal',
      value: `${((fitnessData.dailySteps / 10000) * 100).toFixed(0)}%`,
      icon: Target,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    }
  ];

  if (!account) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 rounded-full mb-6">
          <Activity className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to FitnessCoin</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Connect your wallet to start earning coins by staying active! Track your steps, burn calories, and get rewarded.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-3xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome back, Fitness Champion! 💪
            </h1>
            <p className="text-lg opacity-90">
              Keep moving, keep earning. Your health is your wealth!
            </p>
          </div>
          <div className="text-center">
            <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
              <TrendingUp className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{fitnessData.streakDays}</div>
              <div className="text-sm opacity-80">Day Streak</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
              </div>
              <div className={`text-xs font-medium px-2 py-1 rounded-full ${stat.bgColor} ${stat.textColor}`}>
                +12%
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Step Counter Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <StepCounter />
        </div>

        {/* Daily Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Award className="w-6 h-6 text-green-500 mr-2" />
            Daily Progress
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Steps Goal</span>
                <span className="font-medium">{fitnessData.dailySteps}/10,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((fitnessData.dailySteps / 10000) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Calories Goal</span>
                <span className="font-medium">{Math.floor(fitnessData.dailySteps * 0.04)}/400</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((Math.floor(fitnessData.dailySteps * 0.04) / 400) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {Math.floor(fitnessData.dailySteps / 100)}
                </div>
                <div className="text-sm text-gray-600">Coins Today</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Section */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'First Steps', desc: 'Completed your first 100 steps', achieved: true },
            { title: '1K Explorer', desc: 'Reached 1,000 steps milestone', achieved: true },
            { title: '10K Champion', desc: 'Hit 10,000 steps in a day', achieved: fitnessData.dailySteps >= 10000 },
          ].map((achievement, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                achievement.achieved
                  ? 'border-green-200 bg-green-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className={`text-2xl mb-2 ${achievement.achieved ? '' : 'grayscale'}`}>
                🏆
              </div>
              <h4 className={`font-semibold mb-1 ${
                achievement.achieved ? 'text-green-700' : 'text-gray-500'
              }`}>
                {achievement.title}
              </h4>
              <p className={`text-sm ${
                achievement.achieved ? 'text-green-600' : 'text-gray-400'
              }`}>
                {achievement.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;