import React from 'react';
import { TrendingUp, Calendar, Target, Zap } from 'lucide-react';
import { useFitness } from '../context/FitnessContext';
import StepCounter from './StepCounter';

const StepTracker: React.FC = () => {
  const { fitnessData } = useFitness();

  const weeklyData = [
    { day: 'Mon', steps: 8500, goal: 10000 },
    { day: 'Tue', steps: 12000, goal: 10000 },
    { day: 'Wed', steps: 9500, goal: 10000 },
    { day: 'Thu', steps: 11200, goal: 10000 },
    { day: 'Fri', steps: 7800, goal: 10000 },
    { day: 'Sat', steps: 15000, goal: 10000 },
    { day: 'Sun', steps: fitnessData.dailySteps, goal: 10000 },
  ];

  const maxSteps = Math.max(...weeklyData.map(d => d.steps));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Step Tracker</h1>
        <p className="opacity-90">Monitor your daily activity and reach your fitness goals</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: 'Today', value: fitnessData.dailySteps.toLocaleString(), icon: Target, color: 'text-green-600' },
          { title: 'This Week', value: '68,000', icon: Calendar, color: 'text-blue-600' },
          { title: 'Average', value: '9,714', icon: TrendingUp, color: 'text-purple-600' },
          { title: 'Streak', value: `${fitnessData.streakDays}d`, icon: Zap, color: 'text-orange-600' },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.title}</div>
          </div>
        ))}
      </div>

      {/* Main Tracker */}
      <StepCounter />

      {/* Weekly Chart */}
      {/* <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Weekly Progress</h3>
        <div className="space-y-4">
          {weeklyData.map((day, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-12 text-sm font-medium text-gray-600">{day.day}</div>
              <div className="flex-1 flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                  <div
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${(day.steps / day.goal) * 100}%` }}
                  ></div>
                  {day.steps >= day.goal && (
                    <div className="absolute right-1 top-0 h-4 w-4 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-xs">🏆</span>
                    </div>
                  )}
                </div>
                <div className="w-20 text-sm text-gray-600 text-right">
                  {day.steps.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* Insights */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Insights & Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-xl border border-green-200">
            <div className="text-green-800 font-semibold mb-1">💪 Great Progress!</div>
            <div className="text-sm text-green-700">
              You've maintained a {fitnessData.streakDays}-day streak. Keep it up!
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
            <div className="text-blue-800 font-semibold mb-1">🎯 Daily Goal</div>
            <div className="text-sm text-blue-700">
              {fitnessData.dailySteps >= 10000 
                ? "Goal achieved! You're crushing it today!"
                : `${10000 - fitnessData.dailySteps} steps to reach your daily goal.`
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTracker;