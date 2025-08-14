import React, { useState } from 'react';
import { Shield, Leaf, Gift, Star, ArrowRight, CheckCircle, Upload } from 'lucide-react';
import { useFitness } from '../context/FitnessContext';
import { useWallet } from '../context/WalletContext';

interface RewardOption {
  id: string;
  title: string;
  description: string;
  cost: number;
  icon: React.ElementType;
  type: 'insurance' | 'eco' | 'advertising';
  color: string;
  bgColor: string;
  benefit: string;
}

interface UploadedTree {
  id: string;
  imageUrl: string;
  status: 'pending' | 'validated' | 'rejected';
  timestamp: Date;
}

const RewardsCenter: React.FC = () => {
  const { fitnessData, redeemCoins, addCoins } = useFitness(); // Added addCoins
  const { account } = useWallet();
  const [isRedeeming, setIsRedeeming] = useState<string | null>(null);
  const [uploadedTrees, setUploadedTrees] = useState<UploadedTree[]>([]);
  const [uploading, setUploading] = useState(false);

  const rewardOptions: RewardOption[] = [
    {
      id: 'insurance-basic',
      title: 'Health Insurance Discount',
      description: 'Get up to 20% discount on your health insurance premium',
      cost: 100,
      icon: Shield,
      type: 'insurance',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      benefit: '1% discount per 10 coins'
    },
    {
      id: 'eco-tree',
      title: 'Plant a Tree',
      description: 'Help the environment by funding tree planting initiatives',
      cost: 50,
      icon: Leaf,
      type: 'eco',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      benefit: '1 tree planted'
    },
    {
      id: 'insurance-premium',
      title: 'Premium Insurance Benefits',
      description: 'Unlock enhanced health coverage and wellness programs',
      cost: 250,
      icon: Shield,
      type: 'insurance',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      benefit: '2.5% discount + benefits'
    },
    {
      id: 'eco-forest',
      title: 'Support Forest Conservation',
      description: 'Contribute to large-scale forest conservation projects',
      cost: 200,
      icon: Leaf,
      type: 'eco',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      benefit: '0.1 acre protected'
    },
    {
      id: 'advertising-reward',
      title: 'Brand Partnership Rewards',
      description: 'Exchange coins for exclusive deals and products',
      cost: 75,
      icon: Gift,
      type: 'advertising',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      benefit: 'Exclusive deals'
    },
    {
      id: 'premium-rewards',
      title: 'Premium Rewards Package',
      description: 'All-in-one package with maximum benefits',
      cost: 500,
      icon: Star,
      type: 'insurance',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      benefit: '5% insurance + tree + deals'
    }
  ];

  const handleRedeem = async (reward: RewardOption) => {
    if (!account) {
      alert('Please connect your wallet first!');
      return;
    }

    if (fitnessData.coinsBalance < reward.cost) {
      alert('Insufficient coins! Keep walking to earn more.');
      return;
    }

    setIsRedeeming(reward.id);
    try {
      await redeemCoins(reward.cost, reward.type);
      alert(`Successfully redeemed: ${reward.title}!`);
    } catch (error) {
      console.error('Redemption failed:', error);
      alert('Redemption failed. Please try again.');
    } finally {
      setIsRedeeming(null);
    }
  };

  // Handle tree image upload
  const handleTreeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!account) {
      alert('Please connect your wallet to upload images!');
      return;
    }

    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const newTree: UploadedTree = {
      id: Date.now().toString(),
      imageUrl: URL.createObjectURL(file),
      status: 'pending',
      timestamp: new Date()
    };

    // Simulate validation delay (e.g., AI or admin validation)
    setUploadedTrees((prev) => [newTree, ...prev]);
    setTimeout(() => {
      const isValid = Math.random() > 0.2; // 80% chance of valid image
      setUploadedTrees((prev) =>
        prev.map((t) =>
          t.id === newTree.id ? { ...t, status: isValid ? 'validated' : 'rejected' } : t
        )
      );

      if (isValid) {
        addCoins(50); // Reward user with 50 coins
        alert('Tree validated! You earned 50 fit coins.');
      } else {
        alert('Tree validation failed. Please upload a real tree photo.');
      }
      setUploading(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Rewards Center</h1>
        <p className="opacity-90">Exchange your earned coins for real-world benefits</p>
      </div>

      {/* Coin Balance */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="text-center">
          <div className="text-4xl font-bold text-yellow-500 mb-2">
            {fitnessData.coinsBalance.toLocaleString()}
          </div>
          <div className="text-gray-600 mb-4">Available Coins</div>
          <div className="text-sm text-gray-500">
            Earned from {fitnessData.totalSteps.toLocaleString()} steps
          </div>
        </div>
      </div>

      {/* Reward Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewardOptions.map((reward) => {
          const canAfford = fitnessData.coinsBalance >= reward.cost;
          const isCurrentlyRedeeming = isRedeeming === reward.id;

          return (
            <div
              key={reward.id}
              className={`bg-white rounded-2xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 ${
                canAfford ? 'border-green-200 hover:border-green-300' : 'border-gray-200'
              }`}
            >
              <div className={`p-3 rounded-xl ${reward.bgColor} w-fit mb-4`}>
                <reward.icon className={`w-6 h-6 ${reward.color}`} />
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">{reward.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{reward.description}</p>

              <div className="flex items-center justify-between mb-4">
                <div className={`text-xs font-medium px-2 py-1 rounded-full ${reward.bgColor} ${reward.color}`}>
                  {reward.benefit}
                </div>
                <div className="text-lg font-bold text-gray-900">{reward.cost} coins</div>
              </div>

              <button
                onClick={() => handleRedeem(reward)}
                disabled={!canAfford || isCurrentlyRedeeming || !account}
                className={`w-full flex items-center justify-center space-x-2 py-3 rounded-xl font-medium transition-all duration-200 ${
                  canAfford && account
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:shadow-lg hover:scale-105'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isCurrentlyRedeeming ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : canAfford ? (
                  <>
                    <span>Redeem Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <span>Need {reward.cost - fitnessData.coinsBalance} more coins</span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Tree Upload Section */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Upload Your Planted Tree</h3>
        <input
          type="file"
          accept="image/*"
          onChange={handleTreeUpload}
          disabled={uploading || !account}
          className="mb-4"
        />
        {uploading && <div className="text-gray-500">Uploading and validating image...</div>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {uploadedTrees.map((tree) => (
            <div key={tree.id} className="relative rounded-xl overflow-hidden border shadow-sm">
              <img src={tree.imageUrl} alt="Planted Tree" className="w-full h-40 object-cover" />
              <div
                className={`absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded ${
                  tree.status === 'validated'
                    ? 'bg-green-200 text-green-800'
                    : tree.status === 'rejected'
                    ? 'bg-red-200 text-red-800'
                    : 'bg-yellow-200 text-yellow-800'
                }`}
              >
                {tree.status.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">How Rewards Work</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl mb-2">🚶‍♂️</div>
            <div className="font-semibold text-gray-800 mb-1">Walk & Earn</div>
            <div className="text-sm text-gray-600">Every 100 steps = 1 coin</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">💰</div>
            <div className="font-semibold text-gray-800 mb-1">Collect Coins</div>
            <div className="text-sm text-gray-600">Bonus for daily goals and streaks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🎁</div>
            <div className="font-semibold text-gray-800 mb-1">Get Rewards</div>
            <div className="text-sm text-gray-600">Exchange for real benefits</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsCenter;
