import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useWallet } from './WalletContext';

interface FitnessData {
  totalSteps: number;
  totalCalories: number;
  totalCoinsEarned: number;
  coinsBalance: number;
  dailySteps: number;
  streakDays: number;
  lastUpdate: string;
}

interface FitnessContextType {
  fitnessData: FitnessData;
  isLoading: boolean;
  updateSteps: (steps: number) => Promise<void>;
  redeemCoins: (amount: number, type: 'insurance' | 'eco' | 'advertising') => Promise<void>;
}

const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

interface FitnessProviderProps {
  children: ReactNode;
}

const defaultFitnessData: FitnessData = {
  totalSteps: 0,
  totalCalories: 0,
  totalCoinsEarned: 0,
  coinsBalance: 0,
  dailySteps: 0,
  streakDays: 0,
  lastUpdate: new Date().toDateString()
};

export const FitnessProvider: React.FC<FitnessProviderProps> = ({ children }) => {
  const [fitnessData, setFitnessData] = useState<FitnessData>(defaultFitnessData);
  const [isLoading, setIsLoading] = useState(false);
  const { account } = useWallet();

  // Load fitness data when account changes
  useEffect(() => {
    if (account) {
      loadFitnessData();
    } else {
      setFitnessData(defaultFitnessData);
    }
  }, [account]);

  const loadFitnessData = async () => {
    if (!account) return;
    
    setIsLoading(true);
    try {
      // In real implementation, this would call the Aptos view function
      const savedData = localStorage.getItem(`fitness_${account.address}`);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        
        // Check if it's a new day and reset daily steps
        const today = new Date().toDateString();
        if (parsed.lastUpdate !== today) {
          parsed.dailySteps = 0;
          parsed.lastUpdate = today;
          
          // Check streak
          const lastDate = new Date(parsed.lastUpdate);
          const currentDate = new Date();
          const dayDiff = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
          
          if (dayDiff > 1) {
            parsed.streakDays = 0; // Reset streak if more than 1 day gap
          }
        }
        
        setFitnessData(parsed);
      }
    } catch (error) {
      console.error('Failed to load fitness data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSteps = async (steps: number) => {
    if (!account) throw new Error('No wallet connected');
    
    setIsLoading(true);
    try {
      // Calculate rewards
      const calories = Math.floor(steps * 0.04); // ~0.04 calories per step
      const baseCoins = Math.floor(steps / 100); // 100 steps = 1 coin
      const calorieBonus = Math.floor(calories / 10); // Bonus coins for calories
      const coinsEarned = baseCoins + calorieBonus;
      
      const today = new Date().toDateString();
      const wasNewDay = fitnessData.lastUpdate !== today;
      
      const updatedData: FitnessData = {
        totalSteps: fitnessData.totalSteps + steps,
        totalCalories: fitnessData.totalCalories + calories,
        totalCoinsEarned: fitnessData.totalCoinsEarned + coinsEarned,
        coinsBalance: fitnessData.coinsBalance + coinsEarned,
        dailySteps: wasNewDay ? steps : fitnessData.dailySteps + steps,
        streakDays: wasNewDay && (fitnessData.dailySteps + steps) >= 1000 ? fitnessData.streakDays + 1 : fitnessData.streakDays,
        lastUpdate: today
      };
      
      // In real implementation, this would call the Move smart contract
      console.log('Calling smart contract update_steps with:', steps);
      
      setFitnessData(updatedData);
      localStorage.setItem(`fitness_${account.address}`, JSON.stringify(updatedData));
      
    } catch (error) {
      console.error('Failed to update steps:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const redeemCoins = async (amount: number, type: 'insurance' | 'eco' | 'advertising') => {
    if (!account) throw new Error('No wallet connected');
    if (fitnessData.coinsBalance < amount) throw new Error('Insufficient coins');
    
    setIsLoading(true);
    try {
      // In real implementation, this would call the appropriate Move function
      console.log(`Calling smart contract redeem_coins_for_${type} with amount:`, amount);
      
      const updatedData: FitnessData = {
        ...fitnessData,
        coinsBalance: fitnessData.coinsBalance - amount
      };
      
      setFitnessData(updatedData);
      localStorage.setItem(`fitness_${account.address}`, JSON.stringify(updatedData));
      
    } catch (error) {
      console.error('Failed to redeem coins:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FitnessContext.Provider value={{
      fitnessData,
      isLoading,
      updateSteps,
      redeemCoins
    }}>
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = (): FitnessContextType => {
  const context = useContext(FitnessContext);
  if (context === undefined) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }
  return context;
};