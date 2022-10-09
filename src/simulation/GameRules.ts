import Bloon from "./Bloon";
import GameState from "./GameState";
import Round from "./Round";
import Tower from "./Tower";

export default interface GameRules {
    startingState: GameState;
    timePerEco: number;
    bloonQueueSize: number;
    availableTowers: Tower[];
    availableBloons: Bloon[];
    rounds: Round[];
    sellMultiplier: number;
}