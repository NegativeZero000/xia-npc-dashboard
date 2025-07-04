export default [
    {
        id: 1,
        name: "Enforcer",
        imagePath: "/enforcer_ship.png",
        spawn: "First Lawful Planet",
        movementRate: 6,
        altenateMovementRate: 0,
        altenateMovementCondition: "",
        attackType: "Missile",
        attackDie: 6,
        numberOfAttackDice: 1,
        defenceType: "Shield",
        defenceDie: 6,
        numberOfDefenceDice: 1,
        lifePoints: 12,
        baseRewardFamePoints: 2,
        bounties: 2,
        credits: 0,
        rewardNote: "",
        targetPath: "Draw a planet chip. Goes to any spot on that tile.",
        targetPreference: "Nearest Outlaw Ship up to 5 tiles away or last attacker.",
        numberOfActivationChips: 1,
        validUpgradeDieRollStart: 7,
        validUpgradeDieRollEnd: 8
    },
    {
        id: 2,
        name: "Merchant",
                imagePath: "/merchant_ship.png",
        spawn: "First Neutral Planet",
        movementRate: 8,
        altenateMovementRate: 0,
        altenateMovementCondition: "",
        attackType: "",
        attackDie: 0,
        numberOfAttackDice: 0,
        defenceType: "Shield",
        defenceDie: 6,
        numberOfDefenceDice: 1,
        lifePoints: 15,
        baseRewardFamePoints: 1,
        bounties: 1,
        credits: 0,
        rewardNote: "",
        targetPath: "Draw a planet chip. Goes to any spot on that tile.",
        targetPreference: "",
        numberOfActivationChips: 1,
        validUpgradeDieRollStart: 5,
        validUpgradeDieRollEnd: 6
    },
    {
        id: 3,
        name: "Scoundrel",
                imagePath: "/scoundrel_ship.png",
        spawn: "First Outlaw Planet",
        movementRate: 5,
        altenateMovementRate: 5,
        altenateMovementCondition:
            "If Scoundrel ends movement adjacent to target ship and has a clear line of sight it attacks and moves towards [Loath]",
        attackType: "Blaster",
        attackDie: 8,
        numberOfAttackDice: 1,
        defenceType: "Shield",
        defenceDie: 6,
        numberOfDefenceDice: 1,
        lifePoints: 10,
        baseRewardFamePoints: 1,
        bounties: 0,
        credits: 0,
        rewardNote: "",
        targetPath: "Draw a planet chip. Goes to any spot on that tile.",
        targetPreference: "Nearest innocent ship up to 4 tiles away or last attacker.",
        numberOfActivationChips: 1,
        validUpgradeDieRollStart: 9,
        validUpgradeDieRollEnd: 10
    },
    {
        id: 4,
        name: "Sellsword",
                imagePath: "/sellsword_ship.png",
        spawn: "Second Outlaw Planet",
        movementRate: 7,
        altenateMovementRate: 0,
        altenateMovementCondition: "",
        attackType: "Blaster",
        attackDie: 6,
        numberOfAttackDice: 2,
        defenceType: "Shield",
        defenceDie: 12,
        numberOfDefenceDice: 1,
        lifePoints: 12,
        baseRewardFamePoints: 2,
        bounties: 0,
        credits: 0,
        rewardNote: "Only if on contract",
        targetPath: "Draw a planet chip. Goes to any spot on that tile.",
        targetPreference: "Controlled by player owning the contract.",
        numberOfActivationChips: 1,
        validUpgradeDieRollStart: 11,
        validUpgradeDieRollEnd: 12
    },
];
