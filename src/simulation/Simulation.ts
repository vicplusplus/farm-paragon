import Action from "./actions/Action";
import ApplyEcoAction from "./actions/ApplyEcoAction";
import RoundStartAction from "./actions/RoundStartAction";
import GameRules from "./GameRules";
import GameState from "./GameState";

/**
 * Runs a simulation.
 * @param rules The rules to use for the simulation. This is mandatory.
 * @param state The initial state of the simulation. This is optional. If not specified, rules.startingState will be used.
 * @param actions The list of actions to be applied. This is optional. If not specified, the simulation will start with the default actions.
 * @param endTime The time at which to end the simulation. This is optional. If not specified, the simulation will run until all rounds are complete.
 * @returns A list of actions that were applied and the GameStates that resulted from those actions.
 */
export function Simulate(
    rules: GameRules,
    state: GameState = { ...rules.startingState },
    actions: Action[] = GetStartingActions(rules),
    endTime: number = GetTotalRoundTime(rules)
): [GameState[], Action[]] {
    let states: GameState[] = [{ ...state }];

    let actionsSoFar: Action[] = [];

    while (actions.length > 0 && state.time < endTime) {
        actions.sort((a, b) => a.time - b.time || b.priority - a.priority);
        actionsSoFar.push(actions[0]);

        // get the next action
        let action: Action | undefined = actions.shift();
        if (!action) continue;

        // apply the action
        state.time = action.time;
        action.apply(state, rules, actions);
        states.push({ ...state });
        actionsSoFar.push(action);
    }

    return [states, actionsSoFar];
}

/**
 * Sums the length of all rounds in the given rules.
 * @param rules The rules to read round times from.
 * @returns The total time of all rounds.
 */
const GetTotalRoundTime = (rules: GameRules): number => rules.rounds.reduce((a, b) => a + b.length, 0);

/**
 * Returns the starting actions for a simulation with the given rules.
 * @param rules The rules to use for determining the time between eco actions.
 * @returns A list of default actions to be applied at the start of the simulation.
 */
const GetStartingActions = (rules: GameRules): Action[] => [new RoundStartAction(0), new ApplyEcoAction(rules.timePerEco)];