import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Activity } from 'lucide-react';
import { useFitness } from '../context/FitnessContext';

const StepCounter: React.FC = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [sessionSteps, setSessionSteps] = useState(0);
  const [sessionCalories, setSessionCalories] = useState(0);
  const [simulatedSteps, setSimulatedSteps] = useState(0);
  const { updateSteps } = useFitness();

  // Simulate step counting (in real smartwatch app, this would connect to device sensors)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTracking) {
      interval = setInterval(() => {
        // Simulate realistic step increment (1-5 steps per second while walking)
        const stepIncrement = Math.floor(Math.random() * 3) + 1;
        setSimulatedSteps(prev => prev + stepIncrement);
        setSessionSteps(prev => prev + stepIncrement);
        setSessionCalories(prev => prev + (stepIncrement * 0.04)); // ~0.04 calories per step
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTracking]);

  const handleStartStop = () => {
    setIsTracking(!isTracking);
  };

  const handleReset = () => {
    setIsTracking(false);
    setSessionSteps(0);
    setSessionCalories(0);
    setSimulatedSteps(0);
  };

  const handleSaveSession = async () => {
    if (sessionSteps > 0) {
      try {
        await updateSteps(sessionSteps);
        setSessionSteps(0);
        setSessionCalories(0);
        setSimulatedSteps(0);
        setIsTracking(false);
        alert(`Session saved! ${sessionSteps} steps recorded.`);
      } catch (error) {
        console.error('Failed to save steps:', error);
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center">
          <Activity className="w-6 h-6 text-green-500 mr-2" />
          Step Tracker
        </h2>
        <p className="text-gray-600">
          {isTracking ? 'Currently tracking your movement...' : 'Start tracking to earn coins!'}
        </p>
      </div>

      {/* Step Display */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 mb-6 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-4xl font-bold text-green-600 mb-2">
              {sessionSteps.toLocaleString()}
            </div>
            <div className="text-gray-600 font-medium">Steps</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-red-500 mb-2">
              {Math.floor(sessionCalories)}
            </div>
            <div className="text-gray-600 font-medium">Calories</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-yellow-500 mb-2">
              {Math.floor(sessionSteps / 100)}
            </div>
            <div className="text-gray-600 font-medium">Coins</div>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={handleStartStop}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium shadow-lg transition-all duration-200 hover:scale-105 ${
            isTracking
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isTracking ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          <span>{isTracking ? 'Pause' : 'Start'}</span>
        </button>

        <button
          onClick={handleReset}
          className="flex items-center space-x-2 px-6 py-3 rounded-xl font-medium bg-gray-500 hover:bg-gray-600 text-white shadow-lg transition-all duration-200 hover:scale-105"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Save Session */}
      {sessionSteps > 0 && (
        <div className="text-center">
          <button
            onClick={handleSaveSession}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            Save Session & Earn Coins
          </button>
        </div>
      )}

      {/* Instructions */}
      {/* <div className="mt-6 p-4 bg-blue-50 rounded-xl">
        <h4 className="font-semibold text-blue-800 mb-2">📱 Smartwatch Integration</h4>
        <p className="text-sm text-blue-700">
          In the actual smartwatch app, this would automatically detect your movement using accelerometer and pedometer sensors. 
          This demo simulates realistic step counting for demonstration purposes.
        </p>
      </div> */}
    </div>
  );
};

export default StepCounter;