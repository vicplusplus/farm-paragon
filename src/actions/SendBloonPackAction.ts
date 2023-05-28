import { Action } from "./Action";
import { GameRules } from "../GameRules";
import { GameState } from "../GameState";
import { BloonPack } from "../BloonPack";

export class SendBloonPackAction implements Action {
    time: number;
    bloons: BloonPack;
    forced: boolean = true;

    constructor(time: number, bloons: BloonPack) {
        this.time = time;
        this.bloons = bloons;
    }

    apply(rules: GameRules, state: GameState) {
        state.bloonQueue.splice(0, 1);
    }

    verify(rules: GameRules, state: GameState): boolean {
        return state.bloonQueue[0] === this.bloons;
    }
}