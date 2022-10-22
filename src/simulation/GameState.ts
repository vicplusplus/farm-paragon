import Bloon from "./Bloon";
import Tower from "./Tower";

export default interface GameState {
    cash: number;
    eco: number;
    time: number;
    round: number;
    towers: Tower[];
    bloonQueue?: Bloon[];
}