import GameState from "../GameState";
import Action from "./Action";

export class ApplyEcoAction implements Action {
    public time: number;
    public priority: number = 100;

    apply(state: GameState): Action {
        state.cash += state.eco;
        return new ApplyEcoAction(this.time + 1);
    }

    constructor(time: number) {
        this.time = time;
    }
}