import GameRules from "../GameRules";
import GameState from "../GameState";
import Action from "./Action";

export default class ApplyEcoAction implements Action {
    public type: string = "ApplyEcoAction";
    public time: number;
    public priority: number = 100;

    apply(state: GameState, rules: GameRules): void {
        state.cash += state.eco;
    }

    constructor(time: number) {
        this.time = time;
    }
}