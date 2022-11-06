import type GameState from "../GameState";
import type Action from "./Action";

export default class RoundStartAction implements Action {
    public time: number;

    apply(state: GameState): GameState {
        return {
            ...state,
            round: state.round + 1
        }
    }

    validate = () => true;

    constructor(time: number) {
        this.time = time;
    }
}