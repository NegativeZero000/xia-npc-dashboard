import { useReducer } from "react";

export interface UseShips {
    ships: Ship[];
    addShip: (ship: Ship) => void;
    removeShip: (id: number) => void;
    adjustMovementRate: (id: number, change: number) => void;
    adjustLifePoints: (id: number, change: number) => void;
    adjustCredits: (id: number, change: number) => void;
}

export type Ship = {
    id: number;
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
    | { type: "UPDATE_ATTACK_TYPE"; payload: { id: number } }
    | { type: "UPDATE_ATTACK_NUMBER"; payload: { id: number } };

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
                ship.id === action.payload.id
                    ? { ...ship, lifePoints: ship.lifePoints + action.payload.change }
                    : ship
            );
        case "UPDATE_CREDITS":
            return state.map((ship) =>
                ship.id === action.payload.id
                    ? { ...ship, credits: ship.credits + action.payload.change }
                    : ship
            );
        default:
            return state;
    }
}

export const useShips = (): UseShips => {
    const [ships, dispatch] = useReducer(reducer, []);

    const addShip = (ship: Ship) => dispatch({ type: "ADD_SHIP", payload: { ship } });

    const removeShip = (id: number) => dispatch({ type: "REMOVE_SHIP", payload: { id } });

    const adjustMovementRate = (id: number, change: number) =>
        dispatch({ type: "UPDATE_MOVEMENT_RATE", payload: { id, change } });

    const adjustLifePoints = (id: number, change: number) =>
        dispatch({ type: "UPDATE_LIFE_POINTS", payload: { id, change } });

    const adjustCredits = (id: number, change: number) =>
        dispatch({ type: "UPDATE_CREDITS", payload: { id, change } });

    return { ships, addShip, removeShip, adjustMovementRate, adjustLifePoints , adjustCredits};
};
