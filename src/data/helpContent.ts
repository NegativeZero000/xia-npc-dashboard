export default [
    {
        title: "SPAWN",
        text:
            "NPC's spawn on the spawn point of the tile. On respawn, they come in the same as a player's" +
            " ship with a d20 roll to determine spawn tile.",
    },
    {
        title: "TARGETING",
        text:
            "For NPC's that target other ships, they will target the closest ship based on distance in" +
            " tiles and/or hexes. They do not need line of sight to acquire targets. If there is a tie between" +
            " multiple targets, determine target randomly. Targeting is physical distance, not travel distance.",
    },
    {
        title: "MOVEMENT",
        text:
            "The NPC will fly the most direct path possible. They will even use gates for travel. They" +
            " will avoid all hazards if possible. If it is impossible to reach a target without hazards, they" +
            " will resort to hazardous travel in this order: Asteroids / Debris / Ice / Planetary Shield. They" +
            " do not trigger comets, blackhole, or other hazards.",
    },
];
