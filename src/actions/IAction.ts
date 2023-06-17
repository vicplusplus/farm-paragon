import { GameRules } from "../GameRules";
import { GameState } from "../GameState";

export interface IAction {
    time: number;

    apply(rules: GameRules, state: GameState): void;
    verify(rules: GameRules, state: GameState): void;
}