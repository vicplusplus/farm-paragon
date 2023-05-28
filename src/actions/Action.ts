import { GameRules } from "../GameRules";
import { GameState } from "../GameState";

export interface Action {
    time: number;

    apply(rules: GameRules, state: GameState);
    verify(rules: GameRules, state: GameState): boolean;
}