import GameRules from "../GameRules";
import GameState from "../GameState";
import Action from "./Action";

export default class RoundStartAction implements Action {
    public type: string = "RoundStartAction";
    public time: number;
    public priority: number = 200;

    apply(state: GameState, rules: GameRules, actions: Action[]): void {
        state.round++;
        if (state.round < rules.rounds.length) {
            actions.push(new RoundStartAction(this.time + rules.rounds[state.round].length))
        }
    }

    constructor(time: number) {
        this.time = time;
    }
}