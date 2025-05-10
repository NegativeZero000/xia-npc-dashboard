export interface Ship {
    name: string;
    spawn: string;
    movementRate: number;
    altenateMovementRate: number;
    altenateMovementCondition: string;
    attackType: string;
    attackDie: number;
    numberOfAttackDice: number;
    defenceType: string;
    defenceDie: number;
    numberOfDefenceDice: number;
    lifePoints: number;
    baseRewardFamePoints: number;
    bounties: number;
    rewardNote: string;
    targetPath: string;
    targetPreference: string;
}
