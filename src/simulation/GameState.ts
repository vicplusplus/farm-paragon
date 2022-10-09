import Bloon from "./Bloon";
import Queue from "./util/Queue";
import Tower from "./Tower";

export default interface GameState {
    cash: number;
    eco: number;
    time: number;
    towers: Set<Tower>;
    bloonQueue: Queue<Bloon>;
}