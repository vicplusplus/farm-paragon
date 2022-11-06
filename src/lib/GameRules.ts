import type Bloon from "./Bloon";
import type GameState from "./GameState";
import type Round from "./Round";
import type Tower from "./Tower";
import type Hero from "./Hero";

/**
 * The rules of the game.
 * Included are the available towers, bloon sends and queue size, starting state, rounds, and selected loadout, as well as other miscellaneous rules.
 */
export default interface GameRules {
    startingState: GameState;
    ecoInterval: number;
    bloonQueueSize: number;
    availableTowers: Tower[];
    selectedTowersIndices: number[];
    availableHeroes: Hero[];
    selectedHeroIndex: number;
    availableBloons: Bloon[];
    rounds: Round[];
    sellMultiplier: number;
}