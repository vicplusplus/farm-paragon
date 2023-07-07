import { GameRules, generateInitialGameState, getGameEndTime, getNextRoundStartTime, getRoundAtTime } from "./GameRules";
import { GameState } from "./GameState";
import { BloonSendBreakpointAction } from "./actions/BloonSendBreakpointAction";
import { IAction } from "./actions/IAction";
import { QueueBloonPackAction } from "./actions/QueueBloonPackAction";
import { EPSILON } from "./constants";
import { clone } from "./util";
import { PriorityQueue } from "@datastructures-js/priority-queue";

/**
 * Simulates the game over a specified period of time, applying actions and game rules to the game state at each step.
 * The function returns an array of game states representing the state of the game at each step of the simulation.
 *
 * @param {GameRules} rules - The rules of the game.
 * @param {IAction[]} actions - The list of actions to be performed during the simulation.
 * @param {number} endTime - The end time for the simulation.
 * @param {GameState} initialState - The initial state of the game. If not provided, it will be generated based on the game rules.
 * @returns {GameState[]} An array of game states representing the state of the game at each step of the simulation.
 */
export function simulate(rules: GameRules, actions: IAction[], endTime: number = getGameEndTime(rules), initialState: GameState = generateInitialGameState(rules)): GameState[] {

    let actionQueue = getPreprocessedActions(rules, actions, initialState, endTime);

    let currentState = clone(initialState);

    let states: GameState[] = [];

    let count = 0;

    while (currentState.time < endTime) {
        // check if can apply eco tick
        if (currentState.time > 0 && currentState.time % rules.timePerEcoTick === 0) {
            currentState.money += currentState.eco;
        }

        // check if can send bloons in queue
        if (currentState.bloonQueue.length > 0 && currentState.time === currentState.bloonQueue[0][1]) {
            currentState.bloonQueue.shift();
        }

        // check strategy for any actions to take at this time
        while (!actionQueue.isEmpty() && actionQueue.front().time === currentState.time) {
            let action = actionQueue.dequeue();
            action.verify(rules, currentState);
            action.apply(rules, currentState);
        }

        // check if can send gameState's bloon pack
        while (
            currentState.currentBloonSendIndex !== -1
            && currentState.money >= rules.bloonPacks[currentState.currentBloonSendIndex].price
            && currentState.bloonQueue.length < rules.bloonQueueSize
            && currentState.time - currentState.lastSendTime - rules.bloonSendHoldTime >= -EPSILON
        ) {
            let action = new QueueBloonPackAction(currentState.time, currentState.currentBloonSendIndex)
            try {
                action.verify(rules, currentState);
                action.apply(rules, currentState);
            } catch (e) {
                console.log(`${e}\n Automatically setting currentBloonSend to null.`);
                currentState.currentBloonSendIndex = -1;
            }
        }

        states.push(clone(currentState));

        currentState.time = getNextSimulationTime(rules, currentState, actionQueue, endTime);
    }
    return states;
}


/**
 * Preprocesses a list of actions, filtering out those outside the specified time range and adjusting the start time of certain actions to account for input delay.
 * The preprocessed actions are then returned in a priority queue, sorted by their start time.
 *
 * @param {GameRules} rules - The rules of the game.
 * @param {IAction[]} actions - The list of actions to preprocess.
 * @param {GameState} initialState - The initial state of the game.
 * @param {number} endTime - The end time for the actions.
 * @returns {PriorityQueue<IAction>} A priority queue of preprocessed actions, sorted by start time.
 */
function getPreprocessedActions(rules: GameRules, actions: IAction[], initialState: GameState, endTime: number): PriorityQueue<IAction> {
    return PriorityQueue.fromArray(
        actions.filter(a => a.time >= initialState.time && a.time <= endTime)
            .map(a => {
                // add rules.bloonSendInputDelay to the start time of all QueueBloonPackActions and BloonSendBreakpointActions 
                // to account for the delay between when the user inputs a bloon send and when it is actually sent
                if (a instanceof QueueBloonPackAction || a instanceof BloonSendBreakpointAction) {
                    a.time += rules.bloonSendInputDelay;
                }
                return a;
            }),
        (a: IAction, b: IAction) => a.time - b.time
    );
}

/**
 * Determines the next time to simulate in the game based on various factors such as eco tick time, bloon send time, bloon send input delay time, action time, and round start time.
 * The function returns the earliest time among these events, up to a specified end time.
 *
 * @param {GameRules} rules - The rules of the game.
 * @param {GameState} state - The current state of the game.
 * @param {PriorityQueue<IAction>} actions - The priority queue of actions to be performed.
 * @param {number} endTime - The end time for the simulation.
 * @returns {number} The next time to simulate in the game.
 */
function getNextSimulationTime(rules: GameRules, state: GameState, actions: PriorityQueue<IAction>, endTime: number) {
    // Finds time of next eco tick
    let nextEcoTickTime = state.time + (rules.timePerEcoTick - (state.time % rules.timePerEcoTick));

    // Finds the next time a bloon send leaves the queue
    let nextBloonSendTime = state.bloonQueue.length > 0 ? state.bloonQueue[0][1] : endTime;

    // Finds the next time a bloon send can be inputted if the queue isn't full and there is something to send
    let nextBloonSendInputDelayTime = (state.bloonQueue.length < rules.bloonQueueSize
        && state.currentBloonSendIndex !== -1 && state.money >= rules.bloonPacks[state.currentBloonSendIndex].price) ? state.lastSendTime + rules.bloonSendHoldTime : endTime;

    // Finds the next time an action can be taken
    let nextActionTime = !actions.isEmpty() ? actions.front().time : endTime;

    // Finds the next time a round starts
    let nextRoundStartTime = getNextRoundStartTime(rules, state);

    // find next time to simulate to by choosing the earliest event
    return Math.min(
        nextEcoTickTime,
        nextBloonSendTime,
        nextBloonSendInputDelayTime,
        nextActionTime,
        nextRoundStartTime,
        endTime
    );
}