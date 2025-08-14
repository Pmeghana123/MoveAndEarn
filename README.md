PROJECT TITLE - MOVE AND EARN

TEAM NAME - BLOCK & STACK

TEAM MEMBERS :
Pedapudi Meghana, pedapudimeghana123@gmail.com, https://www.linkedin.com/in/meghana-pedapudi-8a2866287/
Shaik Sahira, sahirashaik2004@gmail.com, https://www.linkedin.com/in/shaiksahira/
Shaik Seema Jabeen, seemajabeenshaik@gamil.com, www.linkedin.com/in/seema-jabeen


PROBLEM STATEMENT :
People often lose motivation to stay consistent with their workouts because they don’t get instant rewards. Current fitness apps don’t combine step tracking with meaningful rewards, 
and most store personal data on centralized servers, which can risk privacy. Eco-friendly reward options are also limited.
We need a decentralized fitness app that tracks steps, converts them into coins, rewards users with insurance discounts and eco-benefits, and keeps data secure on the blockchain.

WIREFRAME :
Navigation Bar: Dashboard | Tracker | Rewards | Profile | Settings
Dashboard: Live steps, calories burned, coins earned, daily goal progress.Tracker: History (date, steps, calories, coins).
Rewards:
Health Insurance Discount
Plant a Tree (image upload → AI verify)
Brand Partnership Rewards Profile: Wallet ID, join date, level, achievements, totals. Settings: Edit daily goal, toggle notifications.

WHAT WE HAVE DONE ?
In the current stage of development, we have successfully implemented Petra Wallet integration for secure blockchain transactions and 
a plant image validation system to verify whether an uploaded image is real or fake. Upon successful validation, users are rewarded with coins.

WHAT WE HAVEN"T !
While step counting functionality has not yet been implemented due to hardware dependencies and complexity, we have a clear roadmap for its integration. 
In future iterations, step and calorie data can be collected directly from a smartwatch or smartphone and transmitted as blockchain transactions. 
These on-chain activity records will enable automated reward distribution—where calories burned are converted into coins—allowing users to redeem 
them for benefits such as insurance discounts and eco-friendly incentives.


SMART CONTRACT DETAILS :
Name: fitness_coin Module

Purpose:
Track user fitness activity (steps, calories) and reward them with coins that can be redeemed for benefits like insurance discounts or eco-friendly initiatives.
Key Features
User Setup
initialize_user → Creates fitness and insurance data for a new user.
Update Steps & Earn Coins
update_steps → Adds steps, calculates calories burned, and converts them into coins.
100 steps = 1 coin
Bonus coins for calories burned
Tracks daily steps & streak days
Emits an event for step updates
Redeem Coins
redeem_coins_for_insurance → Spend coins for insurance discounts (max 20%).
redeem_coins_for_eco_planting → Spend coins for eco-planting rewards.
Keeps history of all redemptions and emits redemption events.
View Data
get_user_fitness_data → Shows steps, calories, coins earned, balance, daily steps, streak days, last update time.
get_insurance_data → Shows coins redeemed for insurance & current discount percentage.
Events Emitted
StepUpdate → When steps are added (records user, steps, calories, coins, time).
CoinRedemption → When coins are redeemed (records user, amount, type, time).


SCREENSHOTS:

DASHBOARD
![DASHBOARD](https://github.com/user-attachments/assets/a5c029ad-ceef-403e-b098-4d62330e0cd6)

TRACKER
![TRACKER](https://github.com/user-attachments/assets/ded3f643-01a1-4735-8e41-cf46c7af003b)

REWARDS
![REWARDS](https://github.com/user-attachments/assets/178c4011-fee6-4df8-9070-4ac1b4560356)

PROFILE
![PROFILE](https://github.com/user-attachments/assets/a7ccef61-b7f3-433c-9340-6cc034edefa2)


