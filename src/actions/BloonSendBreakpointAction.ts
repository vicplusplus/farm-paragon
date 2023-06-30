import { IAction } from "./IAction";
import { GameRules, getRoundAtTime } from "../GameRules";
import { GameState } from "../GameState";
import { BloonPack } from "../BloonPack";

export class BloonSendBreakpointAction implements IAction {
    time: number;
    bloonsIndex: number;

    constructor(time: number, bloons: number) {
        this.time = time;
        this.bloonsIndex = bloons;
    }

    apply(rules: GameRules, state: GameState): void {
        state.currentBloonSendIndex = this.bloonsIndex;
    }

    verify(rules: GameRules, state: GameState): void {
        // action is invalid if the bloon send is not available at the current round
        let round = getRoundAtTime(rules, this.time);
        if (round < rules.bloonPacks[this.bloonsIndex].roundsAvailable[0] || round > rules.bloonPacks[this.bloonsIndex].roundsAvailable[1]) {
            throw new Error(`Cannot send ${rules.bloonPacks[this.bloonsIndex].name} at this round.`);
        }
    }
}
