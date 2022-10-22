import Action from "./actions/Action";
import ApplyEcoAction from "./actions/ApplyEcoAction";
import { EndSimulationAction } from "./actions/EndSimulationAction";
import GameRules from "./GameRules";
import GameState from "./GameState";

export default function SimulateGame(gameRules: GameRules, actions: Action[] = []): GameState[] {

    // gameRules is required
    if (!gameRules) return [];

    let state: GameState = gameRules.startingState;
    let states: GameState[] = [clone(state)];

    actions.push(new ApplyEcoAction(gameRules.rounds[0].length));
    let totalTime = gameRules.rounds.reduce((a, b) => a + b.length, 0);
    actions.push(new EndSimulationAction(totalTime));

    while (actions.length > 0) {
        actions.sort((a, b) => a.time - b.time || b.priority - a.priority);

        let action: Action | undefined;
        do {
            action = actions.shift();
            if (!action) break;
            state.time = action.time;
            action.apply(state, gameRules, actions);
            states.push(clone(state));
        } while (actions.length > 0 && action.time === actions[0].time);
    }

    return states;
}

function clone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}