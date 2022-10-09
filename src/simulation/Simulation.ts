import Action from "./actions/Action";
import GameRules from "./GameRules";
import GameState from "./GameState";

export function SimulateGame(gameRules: GameRules, actions: Action[]): GameState[] {

    let state = gameRules.startingState;
    let states: GameState[] = [state];

    while (actions.length > 0) {
        let action = actions.pop();
        if (!action) break;
        if (action.time > state.time) {
            state.time = action.time;
        }

        action.apply(state, gameRules);
        states.push({ ...state });
    }

    return states;
}