import GameRules from "../GameRules";
import GameState from "../GameState";
import Action from "./Action";

export class EndSimulationAction implements Action {
    public time: number;
    public priority: number = -100;

    apply(state: GameState, rules: GameRules, actions: Action[]): void {
        actions.length = 0;
    }

    constructor(time: number) {
        this.time = time;
    }
}