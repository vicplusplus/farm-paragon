import GameRules from "../GameRules";
import GameState from "../GameState";

export default interface Action {
    type: string;
    time: number;
    priority: number;
    apply(state: GameState, rules: GameRules, actions: Action[]): void;
}
