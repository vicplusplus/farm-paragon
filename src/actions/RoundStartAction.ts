import { Action } from "./Action";
import { GameRules } from "../GameRules";
import { GameState } from "../GameState";

export class RoundStartAction implements Action {
    time: number;

    constructor(time: number) {
        this.time = time;
    }

    apply(rules: GameRules, state: GameState) {
        state.round += 1;
    }

    verify(rules: GameRules, state: GameState): boolean {
        return true
    }
}