import { useReducer, type Reducer } from "react";
import rawShips from "../data/npcData";

export interface UseShips {
    ships: Ship[];
    addShip: (ship: Ship) => void;
    removeShip: (id: number) => void;
    resetShip: (id: number) => void;
    resetAllShips: () => void;
    adjustShipMovementRate: (id: number, change: number) => void;
    adjustShipLifePoints: (id: number, change: number) => void;
    adjustShipCredits: (id: number, change: number) => void;
    adjustShipBounties: (id: number, change: number) => void;
    increaseShipAttackDie: (id: number) => void;
    increaseShipDefenceDie: (id: number) => void;
    increaseShipNumberOfAttackDice: (id: number) => void;
    increaseShipNumberOfDefenceDice: (id: number) => void;
    increaseShipNumberOfActivationChips: (id: number) => void;
}

const npcShips = rawShips as Ship[];
const allowedValues = [0, 4, 6, 8, 12, 20] as const;
type AllowedDieValues = (typeof allowedValues)[number];

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

export type Ship = {
    id: number;
    name: string;
    spawn: string;
    imagePath: string;
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
    | { type: "RESET_SHIP"; payload: { id: number } }
    | { type: "UPDATE_MOVEMENT_RATE"; payload: { id: number; change: number } }
    | { type: "UPDATE_LIFE_POINTS"; payload: { id: number; change: number } }
    | { type: "UPDATE_CREDITS"; payload: { id: number; change: number } }
    | { type: "UPDATE_BOUNTIES"; payload: { id: number; change: number } }
    | { type: "UPDATE_ATTACK_DIE"; payload: { id: number } }
    | { type: "UPDATE_ATTACK_NUMBER_OF_DICE"; payload: { id: number } }
    | { type: "UPDATE_DEFENCE_DIE"; payload: { id: number } }
    | { type: "UPDATE_DEFENCE_NUMBER_OF_DICE"; payload: { id: number } }
    | { type: "UPDATE_ACTIVATION_NUMBER_OF_CHIPS"; payload: { id: number } }
    | { type: "RESET_ALL_SHIPS"; payload: {} };

function reducer(state: Ship[], action: Action) {
    switch (action.type) {
        case "ADD_SHIP":
            return [...state, { ...action.payload.ship }];
        case "REMOVE_SHIP":
            return state.filter((ship) => ship.id !== action.payload.id);
        case "RESET_SHIP":
            return state.map((ship) =>
                ship.id === action.payload.id ? { ...npcShips.find((ship) => ship.id === action.payload.id) } : ship
            );
        case "RESET_ALL_SHIPS":
            return [...npcShips];
        case "UPDATE_MOVEMENT_RATE":
            return state.map((ship) =>
                ship.id === action.payload.id
                    ? { ...ship, movementRate: ship.movementRate + action.payload.change }
                    : ship
            );
        case "UPDATE_LIFE_POINTS":
            return state.map((ship) =>
                ship.id === action.payload.id
                    ? { ...ship, lifePoints: Math.max(0, ship.lifePoints + action.payload.change) }
                    : ship
            );
        case "UPDATE_CREDITS":
            return state.map((ship) =>
                ship.id === action.payload.id
                    ? { ...ship, credits: Math.max(0, ship.credits + action.payload.change) }
                    : ship
            );
        case "UPDATE_BOUNTIES":
            return state.map((ship) =>
                ship.id === action.payload.id
                    ? { ...ship, bounties: Math.max(0, ship.bounties + action.payload.change) }
                    : ship
            );
        case "UPDATE_ATTACK_DIE":
            return state.map((ship) =>
                ship.id === action.payload.id ? { ...ship, attackDie: nextDie(ship.attackDie) } : ship
            );
        case "UPDATE_ATTACK_NUMBER_OF_DICE":
            return state.map((ship) =>
                ship.id === action.payload.id ? { ...ship, numberOfAttackDice: ship.numberOfAttackDice + 1 } : ship
            );
        case "UPDATE_DEFENCE_DIE":
            return state.map((ship) =>
                ship.id === action.payload.id ? { ...ship, defenceDie: nextDie(ship.defenceDie) } : ship
            );
        case "UPDATE_DEFENCE_NUMBER_OF_DICE":
            return state.map((ship) =>
                ship.id === action.payload.id ? { ...ship, numberOfDefenceDice: ship.numberOfDefenceDice + 1 } : ship
            );
        case "UPDATE_ACTIVATION_NUMBER_OF_CHIPS":
            return state.map((ship) =>
                ship.id === action.payload.id
                    ? { ...ship, numberOfActivationChips: ship.numberOfActivationChips + 1 }
                    : ship
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

    const resetShip = (id: number) => dispatch({ type: "RESET_SHIP", payload: { id } });

    const resetAllShips = () => dispatch({ type: "RESET_ALL_SHIPS", payload: {} });

    const adjustShipMovementRate = (id: number, change: number) =>
        dispatch({ type: "UPDATE_MOVEMENT_RATE", payload: { id, change } });

    const adjustShipLifePoints = (id: number, change: number) =>
        dispatch({ type: "UPDATE_LIFE_POINTS", payload: { id, change } });

    const adjustShipCredits = (id: number, change: number) =>
        dispatch({ type: "UPDATE_CREDITS", payload: { id, change } });

    const adjustShipBounties = (id: number, change: number) =>
        dispatch({ type: "UPDATE_BOUNTIES", payload: { id, change } });

    const increaseShipAttackDie = (id: number) => dispatch({ type: "UPDATE_ATTACK_DIE", payload: { id } });

    const increaseShipNumberOfAttackDice = (id: number) =>
        dispatch({ type: "UPDATE_ATTACK_NUMBER_OF_DICE", payload: { id } });

    const increaseShipDefenceDie = (id: number) => dispatch({ type: "UPDATE_DEFENCE_DIE", payload: { id } });

    const increaseShipNumberOfDefenceDice = (id: number) =>
        dispatch({ type: "UPDATE_DEFENCE_NUMBER_OF_DICE", payload: { id } });

    const increaseShipNumberOfActivationChips = (id: number) =>
        dispatch({ type: "UPDATE_ACTIVATION_NUMBER_OF_CHIPS", payload: { id } });

    return {
        ships,
        addShip,
        removeShip,
        resetShip,
        resetAllShips,
        adjustShipMovementRate,
        adjustShipLifePoints,
        adjustShipCredits,
        adjustShipBounties,
        increaseShipAttackDie,
        increaseShipDefenceDie,
        increaseShipNumberOfAttackDice,
        increaseShipNumberOfDefenceDice,
        increaseShipNumberOfActivationChips,
    };
};
