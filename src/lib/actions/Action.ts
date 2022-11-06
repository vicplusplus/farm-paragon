import type GameRules from "../GameRules";
import type GameState from "../GameState";

export default interface Action {
    time: number;
    apply(state: GameState, rules: GameRules): GameState;
    validate(state: GameState, rules: GameRules): boolean;
}
