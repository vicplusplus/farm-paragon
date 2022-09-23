import { Action } from "./Action";
import Bloon from "./Bloon";
import GameRules from "./GameRules";
import Queue from "./Queue";
import Tower from "./Tower";

export function* SimulateGame(gameRules: GameRules, actions: Action[]) {
    let cash = gameRules.startingCash;
    let eco = gameRules.startingEco;
    let time = 0;
    let towers = new Set<Tower>();
    let bloonQueue = new Queue<Bloon>();
    actions.sort((a, b) => b.time - a.time);
    yield new GameState(time, cash, eco, towers, bloonQueue);
}

export class GameState {
    cash: number;
    eco: number;
    time: number;
    towers: Set<Tower>;
    bloonQueue: Queue<Bloon>;

    constructor(time: number, cash: number, eco: number, towers: Set<Tower>, bloonQueue: Queue<Bloon>) {
        this.time = time;
        this.cash = cash;
        this.eco = eco;
        this.towers = towers;
        this.bloonQueue = bloonQueue;
    }
}