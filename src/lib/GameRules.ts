import type Bloon from "./Bloon";
import type GameState from "./GameState";
import type Round from "./Round";
import type Tower from "./Tower";
import type Hero from "./Hero";

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