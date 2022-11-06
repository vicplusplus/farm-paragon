import type GameState from "../GameState";
import type Action from "./Action";

export default class ApplyEcoAction implements Action {
    public time: number;

    apply(state: GameState): GameState {
        return {
            ...state,
            cash: state.cash + state.eco,
        }
    }

    validate = (state: GameState) => state.time < this.time;

    constructor(time: number) {
        this.time = time;
    }
}