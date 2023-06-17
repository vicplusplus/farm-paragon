import { IAction } from "./IAction";
import { GameRules, getRoundAtTime } from "../GameRules";
import { GameState } from "../GameState";
import { BloonPack } from "../BloonPack";

export class BloonSendBreakpointAction implements IAction {
    time: number;
    bloons: BloonPack;

    constructor(time: number, bloons: BloonPack) {
        this.time = time;
        this.bloons = bloons;
    }

    apply(rules: GameRules, state: GameState): void {
        state.currentBloonSend = this.bloons;
    }

    verify(rules: GameRules, state: GameState): void {
        // action is invalid if the bloon send is not available at the current round
        let round = getRoundAtTime(rules, this.time);
        if (round < this.bloons.roundsAvailable[0] || round > this.bloons.roundsAvailable[1]) {
            throw new Error(`Cannot send ${this.bloons.name} at this round.`);
        }
    }
}
