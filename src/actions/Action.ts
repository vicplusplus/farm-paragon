import { GameRules } from "../GameRules";
import { GameState } from "../GameState";

export interface Action {
    time: number;
    forced: boolean;

    apply(rules: GameRules, state: GameState): Action | void;
    verify(rules: GameRules, state: GameState);
}