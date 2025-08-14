# FitnessCoin DApp - Move & Earn

A revolutionary decentralized application (dApp) that rewards users with cryptocurrency for staying active. Built on Aptos blockchain with Move smart contracts and a beautiful React frontend.

## 🌟 Features

### Core Functionality
- **Automatic Step Tracking**: Simulated smartwatch integration for step counting
- **Coin Rewards**: Earn coins based on steps taken and calories burned
- **Blockchain Storage**: All data stored securely on Aptos blockchain
- **Zero Starting Points**: New users begin with zero, ensuring fair gameplay

### Reward System
- **Insurance Discounts**: Use coins for health insurance premium reductions
- **Eco-Friendly Initiatives**: Plant trees and support forest conservation
- **Brand Partnerships**: Exchange coins for exclusive deals and products
- **Achievement System**: Unlock badges and maintain daily streaks

### Smart Features
- **Google Auth Integration**: Easy wallet connection with Google authentication
- **Real-time Dashboard**: Track progress with beautiful visualizations
- **Responsive Design**: Optimized for smartwatch, mobile, and desktop
- **Data Persistence**: Blockchain ensures data never gets lost

## 🏗️ Architecture

### Backend (Aptos Move)
- **FitnessCoin Module**: Core smart contract handling all fitness data
- **User Initialization**: Automatic setup for new users with zero balance
- **Step Updates**: Secure recording of fitness activities
- **Reward Redemption**: Multiple redemption types (insurance, eco, advertising)
- **Data Views**: Read functions for displaying user statistics

### Frontend (React + TypeScript)
- **Context Management**: Wallet and fitness data contexts
- **Component Architecture**: Modular, reusable components
- **Real-time Updates**: Immediate UI feedback for all actions
- **Simulated Sensors**: Step counting simulation for web demo

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm or yarn
- Aptos CLI (for deploying contracts)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fitness-coin-dapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Aptos Move contracts**
   ```bash
   cd move
   aptos init
   aptos move compile
   aptos move publish
   ```

4. **Update contract addresses**
   - Copy the deployed contract address
   - Update the address in your frontend configuration

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Connect your wallet to start earning coins!

## 📱 Smartwatch Integration

### Real Implementation Notes
For actual smartwatch deployment, the step counting would integrate with:

- **iOS**: Core Motion framework for step detection
- **Android**: StepCounter Sensor API for accurate tracking
- **Wear OS**: Health Services API for continuous monitoring
- **Apple Watch**: HealthKit integration for comprehensive health data

### Current Demo
The web version simulates realistic step counting to demonstrate the full user experience without requiring actual hardware sensors.

## 🔐 Blockchain Integration

### Move Smart Contract Functions

**Initialization**
```move
public entry fun initialize_user(account: &signer)
```

**Step Updates**
```move
public entry fun update_steps(account: &signer, steps: u64)
```

**Coin Redemption**
```move
public entry fun redeem_coins_for_insurance(account: &signer, amount: u64)
public entry fun redeem_coins_for_eco_planting(account: &signer, amount: u64)
```

**Data Views**
```move
public fun get_user_fitness_data(user: address): (u64, u64, u64, u64, u64, u64, u64)
```

### Security Features
- **Row Level Security**: Each user can only access their own data
- **Input Validation**: All step counts and redemptions validated
- **Event Emission**: All actions logged for transparency
- **Overflow Protection**: Safe arithmetic operations throughout

## 💰 Tokenomics

### Earning Rates
- **Base Rate**: 1 coin per 100 steps
- **Calorie Bonus**: Additional coins for calories burned
- **Daily Goals**: Bonus multipliers for reaching targets
- **Streak Rewards**: Extra coins for consecutive active days

### Redemption Options
- **Insurance**: 10 coins = 0.1% premium discount (max 20%)
- **Tree Planting**: 50 coins = 1 tree planted
- **Forest Conservation**: 200 coins = 0.1 acre protected
- **Brand Deals**: 75 coins = Exclusive product offers

## 🌍 Environmental Impact

Our eco-friendly initiatives include:
- **Carbon Neutral**: Blockchain operations offset by tree planting
- **Real Impact**: Partnerships with verified conservation organizations
- **Transparency**: All environmental contributions tracked on-chain
- **Sustainability**: Long-term commitment to environmental protection

## 🔧 Development

### Project Structure
```
├── move/                 # Aptos Move smart contracts
│   ├── sources/
│   │   └── FitnessCoin.move
│   └── Move.toml
├── src/
│   ├── components/       # React components
│   ├── context/         # Context providers
│   └── App.tsx
├── public/              # Static assets
└── package.json
```

### Testing
```bash
# Run Move tests
cd move && aptos move test

# Run frontend tests
npm test
```

### Deployment
```bash
# Deploy Move contracts
cd move && aptos move publish

# Build frontend
npm run build

# Deploy frontend (example with Netlify)
npm run deploy
```

## 📊 Data Storage

All user data is stored on the Aptos blockchain:

- **Total Steps**: Lifetime step count
- **Calories Burned**: Total calories from all activities
- **Coins Earned**: Total coins earned from activities
- **Current Balance**: Available coins for redemption
- **Daily Progress**: Today's steps and goals
- **Streak Data**: Consecutive active days
- **Redemption History**: All past redemptions with timestamps

## 🎯 Future Roadmap

- **Hardware Integration**: Direct smartwatch and fitness tracker support
- **Social Features**: Friends, challenges, and leaderboards
- **Advanced Analytics**: Detailed health insights and trends
- **NFT Rewards**: Unique collectibles for major achievements
- **DeFi Integration**: Staking and yield farming with fitness tokens
- **Insurance Partnerships**: Direct integration with health insurance providers

## 🤝 Contributing

We welcome contributions! Please read our contributing guidelines and submit pull requests for any improvements.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Documentation**: Check our wiki for detailed guides
- **Issues**: Report bugs on our GitHub issues page
- **Community**: Join our Discord for discussions
- **Email**: Contact us at support@fitnesscoin.com

---

**Start your fitness journey today and earn while you move! 🏃‍♀️💰**