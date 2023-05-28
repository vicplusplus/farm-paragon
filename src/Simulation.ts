import { Action } from "./actions/Action";
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
    for (let i = 0; i < combinedActions.length; i++) {
        let action = combinedActions[i];

        // Throws any errors if action fails to verify
        action.verify(rules, currentState);

        // Apply action after synchronizing time
        currentState.time = action.time;
        let followupAction = action.apply(rules, currentState);

        // Some actions have followups. Added a time check to prevent accidental bugs 
        // that happen when not offsetting new action time by current time
        // As long as followups are after the original action, the simulation runs fine
        if (followupAction) {
            if (followupAction.time <= action.time) {
                throw new Error(`Created invalid action in the past from:\n${JSON.stringify(action)}`);
            }
            combinedActions.push(followupAction);
            combinedActions.sort((a, b) => a.time - b.time);
        }

        // Keep a history of the states so far
        states.push(clone(currentState));
    }
    return states;
}