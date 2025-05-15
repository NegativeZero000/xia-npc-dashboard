import { useReducer } from "react";

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
    | { type: "UPDATE_MOVEMENT_RATE"; payload: { id: number; speed: number } }
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
                    ? { ...ship, movementRate: ship.movementRate + action.payload.speed }
                    : ship
            );
        default:
            return state;
    }
};

export const useShips = () => {
    const [ships, dispatch] = useReducer(reducer, []);

    const addShip = (ship: Ship) => dispatch({ type: "ADD_SHIP", payload: { ship } });

    const removeShip = (id: number) => dispatch({ type: "REMOVE_SHIP", payload: { id } });

    const updateMovementRate = (id: number, speed: number) =>
        dispatch({ type: "UPDATE_MOVEMENT_RATE", payload: { id, speed } });

    return { ships, addShip, removeShip, updateMovementRate };
};
