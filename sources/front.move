module  meg_addr::fitness_coin {
    use std::signer;
    use std::vector;
    use aptos_framework::timestamp;
    use aptos_framework::event;

    const E_NOT_INITIALIZED: u64 = 1;
    const E_ALREADY_INITIALIZED: u64 = 2;
    const E_INSUFFICIENT_COINS: u64 = 3;
     const E_INVALID_STEPS: u64 = 4;

    struct FitnessData has key {
        total_steps: u64,
        total_calories_burned: u64,
        total_coins_earned: u64,
        coins_balance: u64,
        last_update_timestamp: u64,
        daily_steps: u64,
        streak_days: u64,
    }

    struct InsuranceRedemption has key {
        total_redeemed: u64,
        discount_percentage: u64,
        redemption_history: vector<RedemptionRecord>,
    }

    struct RedemptionRecord has store, drop {
        amount: u64,
        timestamp: u64,
        redemption_type: u8, // 1: Insurance, 2: Advertising, 3: Eco-planting
    }

    struct StepUpdateEvent has drop, store {
        user: address,
        steps_added: u64,
        calories_burned: u64,
        coins_earned: u64,
        timestamp: u64,
    }

    struct CoinRedemptionEvent has drop, store {
        user: address,
        amount: u64,
        redemption_type: u8,
        timestamp: u64,
    }

    #[event]
    struct StepUpdate has drop, store {
        user: address,
        steps_added: u64,
        calories_burned: u64,
        coins_earned: u64,
        timestamp: u64,
    }

    #[event]
    struct CoinRedemption has drop, store {
        user: address,
        amount: u64,
        redemption_type: u8,
        timestamp: u64,
    }

    public entry fun initialize_user(account: &signer) {
        let user_addr = signer::address_of(account);
        assert!(!exists<FitnessData>(user_addr), E_ALREADY_INITIALIZED);

        let fitness_data = FitnessData {
            total_steps: 0,
            total_calories_burned: 0,
            total_coins_earned: 0,
            coins_balance: 0,
            last_update_timestamp: timestamp::now_seconds(),
            daily_steps: 0,
            streak_days: 0,
        };

        let insurance_redemption = InsuranceRedemption {
            total_redeemed: 0,
            discount_percentage: 0,
            redemption_history: vector::empty(),
        };

        move_to(account, fitness_data);
        move_to(account, insurance_redemption);
    }

    public entry fun update_steps(account: &signer, steps: u64) acquires FitnessData {
        let user_addr = signer::address_of(account);
        assert!(exists<FitnessData>(user_addr), E_NOT_INITIALIZED);
        assert!(steps > 0, E_INVALID_STEPS);

        let fitness_data = borrow_global_mut<FitnessData>(user_addr);
        let current_time = timestamp::now_seconds();
        
        // Calculate calories burned (rough estimate: 1000 steps = ~40 calories)
        let calories_burned = (steps * 40) / 1000;
        
        // Calculate coins earned (100 steps = 1 coin, bonus for calories)
        let base_coins = steps / 100;
        let calorie_bonus = calories_burned / 10;
        let coins_earned = base_coins + calorie_bonus;

        // Update fitness data
        fitness_data.total_steps = fitness_data.total_steps + steps;
        fitness_data.total_calories_burned = fitness_data.total_calories_burned + calories_burned;
        fitness_data.total_coins_earned = fitness_data.total_coins_earned + coins_earned;
        fitness_data.coins_balance = fitness_data.coins_balance + coins_earned;
        fitness_data.last_update_timestamp = current_time;

        // Check if it's a new day and update daily steps
        let time_diff = current_time - fitness_data.last_update_timestamp;
        if (time_diff > 86400) { // 24 hours in seconds
            fitness_data.daily_steps = steps;
            if (steps >= 10000) {
                fitness_data.streak_days = fitness_data.streak_days + 1;
            };
        } else {
            fitness_data.daily_steps = fitness_data.daily_steps + steps;
        };

        // Emit step update event
        event::emit(StepUpdate {
            user: user_addr,
            steps_added: steps,
            calories_burned,
            coins_earned,
            timestamp: current_time,
        });
    }

    public entry fun redeem_coins_for_insurance(
        account: &signer, 
        amount: u64
    ) acquires FitnessData, InsuranceRedemption {
        let user_addr = signer::address_of(account);
        assert!(exists<FitnessData>(user_addr), E_NOT_INITIALIZED);

        let fitness_data = borrow_global_mut<FitnessData>(user_addr);
        assert!(fitness_data.coins_balance >= amount, E_INSUFFICIENT_COINS);

        let insurance_data = borrow_global_mut<InsuranceRedemption>(user_addr);
        
        // Calculate discount percentage (1 coin = 0.1% discount, max 20%)
        let additional_discount = (amount / 10);
        insurance_data.discount_percentage = insurance_data.discount_percentage + additional_discount;
        if (insurance_data.discount_percentage > 200) { // 20% max
            insurance_data.discount_percentage = 200;
        };

        // Update balances
        fitness_data.coins_balance = fitness_data.coins_balance - amount;
        insurance_data.total_redeemed = insurance_data.total_redeemed + amount;

        // Record redemption
        let redemption = RedemptionRecord {
            amount,
            timestamp: timestamp::now_seconds(),
            redemption_type: 1, // Insurance
        };
        vector::push_back(&mut insurance_data.redemption_history, redemption);

        // Emit redemption event
        event::emit(CoinRedemption {
            user: user_addr,
            amount,
            redemption_type: 1,
            timestamp: timestamp::now_seconds(),
        });
    }

    public entry fun redeem_coins_for_eco_planting(
        account: &signer,
        amount: u64
    ) acquires FitnessData, InsuranceRedemption {
        let user_addr = signer::address_of(account);
        assert!(exists<FitnessData>(user_addr), E_NOT_INITIALIZED);

        let fitness_data = borrow_global_mut<FitnessData>(user_addr);
        assert!(fitness_data.coins_balance >= amount, E_INSUFFICIENT_COINS);

        let insurance_data = borrow_global_mut<InsuranceRedemption>(user_addr);

        // Update balances
        fitness_data.coins_balance = fitness_data.coins_balance - amount;

        // Record redemption
        let redemption = RedemptionRecord {
            amount,
            timestamp: timestamp::now_seconds(),
            redemption_type: 3, // Eco-planting
        };
        vector::push_back(&mut insurance_data.redemption_history, redemption);

        // Emit redemption event
        event::emit(CoinRedemption {
            user: user_addr,
            amount,
            redemption_type: 3,
            timestamp: timestamp::now_seconds(),
        });
    }

    #[view]
    public fun get_user_fitness_data(user: address): (u64, u64, u64, u64, u64, u64, u64) acquires FitnessData {
        assert!(exists<FitnessData>(user), E_NOT_INITIALIZED);
        let fitness_data = borrow_global<FitnessData>(user);
        (
            fitness_data.total_steps,
            fitness_data.total_calories_burned,
            fitness_data.total_coins_earned,
            fitness_data.coins_balance,
            fitness_data.daily_steps,
            fitness_data.streak_days,
            fitness_data.last_update_timestamp
        )
    }

    #[view]
    public fun get_insurance_data(user: address): (u64, u64) acquires InsuranceRedemption {
        assert!(exists<InsuranceRedemption>(user), E_NOT_INITIALIZED);
        let insurance_data = borrow_global<InsuranceRedemption>(user);
        (insurance_data.total_redeemed, insurance_data.discount_percentage)
    }
}