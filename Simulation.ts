import { Action } from "./Action";
import { GameRules, generateEcoActions, generateInitialGameState, generateRoundStartActions } from "./GameRules";
import { GameState } from "./GameState";
import { clone } from "./util";

export function simulate(rules: GameRules, inputActions: Action[]): GameState[] {
    let combinedActions = [
        ...inputActions,
        ...generateEcoActions(rules),
        ...generateRoundStartActions(rules)
    ].sort((a, b) => a.time - b.time);

    let currentState = generateInitialGameState(rules);
    let states = [clone(currentState)];
    for (const action of combinedActions) {
        action.apply(rules, currentState);
        currentState.time = action.time;
        states.push(clone(currentState));
    }
    return states;
}