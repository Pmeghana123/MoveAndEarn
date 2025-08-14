import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Account {
  address: string;
  publicKey: string;
}

interface WalletContextType {
  account: Account | null;
  isConnecting: boolean;
  connectWallet: (method: 'google' | 'wallet') => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<Account | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Check for existing connection on load
  useEffect(() => {
    const savedAccount = localStorage.getItem('connectedAccount');
    if (savedAccount) {
      try {
        setAccount(JSON.parse(savedAccount));
      } catch (error) {
        console.error('Failed to restore account:', error);
        localStorage.removeItem('connectedAccount');
      }
    }
  }, []);

  const connectWallet = async (method: 'google' | 'wallet') => {
    setIsConnecting(true);
    try {
      let connectedAccount: Account;

      if (method === 'google') {
        // Simulate Google OAuth + Aptos wallet creation
        // In real implementation, this would integrate with Google OAuth and generate Aptos keypair
        const mockAccount = {
          address: `0x${Math.random().toString(16).substring(2, 66)}`,
          publicKey: `0x${Math.random().toString(16).substring(2, 66)}`
        };
        connectedAccount = mockAccount;
        
        // Simulate authentication delay
        await new Promise(resolve => setTimeout(resolve, 2000));
      } else {
        // Try to connect to Aptos wallet
        if (typeof window !== 'undefined' && (window as any).aptos) {
          const response = await (window as any).aptos.connect();
          connectedAccount = {
            address: response.address,
            publicKey: response.publicKey
          };
        } else {
          // Fallback mock for demo purposes
          const mockAccount = {
            address: `0x${Math.random().toString(16).substring(2, 66)}`,
            publicKey: `0x${Math.random().toString(16).substring(2, 66)}`
          };
          connectedAccount = mockAccount;
        }
      }

      setAccount(connectedAccount);
      localStorage.setItem('connectedAccount', JSON.stringify(connectedAccount));
      
      // Initialize user in smart contract (in real app, this would call the Move function)
      console.log('Initializing user in smart contract...');
      
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAccount(null);
    localStorage.removeItem('connectedAccount');
  };

  return (
    <WalletContext.Provider value={{
      account,
      isConnecting,
      connectWallet,
      disconnect
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};