import { useReducer, type Reducer } from "react";

export interface UseShips {
    ships: Ship[];
    addShip: (ship: Ship) => void;
    removeShip: (id: number) => void;
    adjustShipMovementRate: (id: number, change: number) => void;
    adjustShipLifePoints: (id: number, change: number) => void;
    adjustShipCredits: (id: number, change: number) => void;
    adjustShipBounties: (id: number, change: number) => void;
    adjustShipAttackDie: (id: number) => void;
}

const allowedValues = [0, 4, 6, 8, 12, 20] as const;
type AllowedDieValues = (typeof allowedValues)[number];

export type Ship = {
    id: number;
    name: string;
    spawn: string;
    movementRate: number;
    altenateMovementRate: number;
    altenateMovementCondition: string;
    attackType: string;
    attackDie: AllowedDieValues;
    numberOfAttackDice: number;
    defenceType: string;
    defenceDie: AllowedDieValues;
    numberOfDefenceDice: number;
    lifePoints: number;
    baseRewardFamePoints: number;
    bounties: number;
    credits: number;
    rewardNote: string;
    targetPath: string;
    targetPreference: string;
    numberOfActivationChips: number;
    validUpgradeDieRollStart: number;
    validUpgradeDieRollEnd: number;
};

type Action =
    | { type: "ADD_SHIP"; payload: { ship: Ship } }
    | { type: "REMOVE_SHIP"; payload: { id: number } }
    | { type: "UPDATE_MOVEMENT_RATE"; payload: { id: number; change: number } }
    | { type: "UPDATE_LIFE_POINTS"; payload: { id: number; change: number } }
    | { type: "UPDATE_CREDITS"; payload: { id: number; change: number } }
    | { type: "UPDATE_BOUNTIES"; payload: { id: number; change: number } }
    | { type: "UPDATE_ATTACK_DIE"; payload: { id: number } }
    | { type: "UPDATE_ATTACK_NUMBER"; payload: { id: number } }
    | { type: "UPDATE_DEFENCE_DIE"; payload: { id: number } }
    | { type: "UPDATE_DEFENCE_NUMBER"; payload: { id: number } };

function nextDie(dieIndex: AllowedDieValues) {
    // Given a dieIndex e.g. 6, get the next higher die and return its index
    const nextDieMap: Record<number, number> = {
        0: 0,
        4: 6,
        6: 8,
        8: 12,
        12: 20,
        20: 20,
    };

    return nextDieMap[dieIndex];
}

function reducer(state: Ship[], action: Action) {
    switch (action.type) {
        case "ADD_SHIP":
            return [...state, { ...action.payload.ship }];
        case "REMOVE_SHIP":
            return state.filter((ship) => ship.id !== action.payload.id);
        case "UPDATE_MOVEMENT_RATE":
            return state.map((ship) =>
                ship.id === action.payload.id
                    ? { ...ship, movementRate: ship.movementRate + action.payload.change }
                    : ship
            );
        case "UPDATE_LIFE_POINTS":
            return state.map((ship) =>
                ship.id === action.payload.id ? { ...ship, lifePoints: ship.lifePoints + action.payload.change } : ship
            );
        case "UPDATE_CREDITS":
            return state.map((ship) =>
                ship.id === action.payload.id ? { ...ship, credits: ship.credits + action.payload.change } : ship
            );
        case "UPDATE_BOUNTIES":
            return state.map((ship) =>
                ship.id === action.payload.id ? { ...ship, bounties: ship.bounties + action.payload.change } : ship
            );
        case "UPDATE_ATTACK_DIE":
            return state.map((ship) =>
                ship.id === action.payload.id ? { ...ship, attackDie: nextDie(ship.attackDie) } : ship
            );
        default:
            return state;
    }
}

export const useShips = (): UseShips => {
    // const [ships, dispatch] = useReducer(reducer, [] as Ship[]);
    const [ships, dispatch] = useReducer(reducer as Reducer<Ship[], Action>, []);

    const addShip = (ship: Ship) => dispatch({ type: "ADD_SHIP", payload: { ship } });

    const removeShip = (id: number) => dispatch({ type: "REMOVE_SHIP", payload: { id } });

    const adjustShipMovementRate = (id: number, change: number) =>
        dispatch({ type: "UPDATE_MOVEMENT_RATE", payload: { id, change } });

    const adjustShipLifePoints = (id: number, change: number) =>
        dispatch({ type: "UPDATE_LIFE_POINTS", payload: { id, change } });

    const adjustShipCredits = (id: number, change: number) =>
        dispatch({ type: "UPDATE_CREDITS", payload: { id, change } });

    const adjustShipBounties = (id: number, change: number) =>
        dispatch({ type: "UPDATE_BOUNTIES", payload: { id, change } });

    const adjustShipAttackDie = (id: number) => dispatch({ type: "UPDATE_ATTACK_DIE", payload: { id } });

    return {
        ships,
        addShip,
        removeShip,
        adjustShipMovementRate,
        adjustShipLifePoints,
        adjustShipCredits,
        adjustShipBounties,
        adjustShipAttackDie,
    };
};
