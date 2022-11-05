import GameRules from "../GameRules";
import GameState from "../GameState";
import Action from "./Action";

export default class RoundStartAction implements Action {
    public type: string = "RoundStartAction";
    public time: number;
    public priority: number = 200;

    apply(state: GameState, rules: GameRules): void {
        state.round++;
    }

    constructor(time: number) {
        this.time = time;
    }
}