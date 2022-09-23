import Bloon from "./Bloon";
import Round from "./Round";
import Tower from "./Tower";

export default interface GameRules {
    startingCash: number;
    startingEco: number;
    timePerEco: number;
    bloonQueueSize: number;
    availableTowers: Set<Tower>;
    availableBloons: Set<Bloon>;
    rounds: Round[];
    sellMultiplier: number;
}