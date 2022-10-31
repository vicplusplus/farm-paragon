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

        // get the next action
        let action: Action | undefined = actions.shift();
        if (!action) continue;

        // apply the action
        state.time = action.time;
        action.apply(state, rules);
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
function GetStartingActions(rules: GameRules): Action[] {
    // get total round time
    const totalRoundTime = GetTotalRoundTime(rules);

    // create an eco action for each eco interval until the end of the last round
    let actions: Action[] = [];
    for (let i = rules.ecoInterval; i < totalRoundTime; i += rules.ecoInterval) {
        actions.push(new ApplyEcoAction(i));
    }

    // add a round start action for each round
    let time = 0;
    for (let i = 0; i < rules.rounds.length; i++) {
        time += rules.rounds[i].length;
        actions.push(new RoundStartAction(time));
    }
    return actions;
}