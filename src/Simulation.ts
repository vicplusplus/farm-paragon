import { GameRules, generateInitialGameState, getNextRoundStartTime, getRoundAtTime } from "./GameRules";
import { GameState } from "./GameState";
import { BloonSendBreakpointAction } from "./actions/BloonSendBreakpointAction";
import { IAction } from "./actions/IAction";
import { QueueBloonPackAction } from "./actions/QueueBloonPackAction";
import { EPSILON, clone } from "./util";
import { PriorityQueue } from "@datastructures-js/priority-queue";

export function simulate(rules: GameRules, actions: IAction[], endTime: number, initialState: GameState = generateInitialGameState(rules)): GameState[] {

    let actionQueue = PriorityQueue.fromArray(
        actions.filter(a => a.time >= initialState!.time && a.time <= endTime)
            .map(a => {
                // add rules.bloonSendInputDelay to the start time of all QueueBloonPackActions and BloonSendBreakpointActions 
                // to account for the delay between when the user inputs a bloon send and when it is actually sent
                if (a instanceof QueueBloonPackAction || a instanceof BloonSendBreakpointAction) {
                    a.time += rules.bloonSendInputDelay;
                }
                return a;
            }),
        (a, b) => a.time - b.time
    );

    let currentState = clone(initialState);

    let states: GameState[] = [];

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
            currentState.currentBloonSend !== null
            && currentState.money >= currentState.currentBloonSend.price
            && currentState.bloonQueue.length <= rules.bloonQueueSize
            && currentState.time - currentState.lastSendTime - rules.bloonSendHoldTime >= -EPSILON
        ) {
            let action = new QueueBloonPackAction(currentState.time, currentState.currentBloonSend)
            action.verify(rules, currentState);
            action.apply(rules, currentState);
        }

        states.push(clone(currentState));

        // Finds time of next eco tick
        let nextEcoTickTime = currentState.time + (rules.timePerEcoTick - (currentState.time % rules.timePerEcoTick));

        // Finds the next time a bloon send leaves the queue
        let nextBloonSendTime = currentState.bloonQueue.length > 0 ? currentState.bloonQueue[0][1] : endTime;

        // Finds the next time a bloon send can be inputted if the queue isn't full and there is something to send
        let nextBloonSendInputDelayTime = currentState.bloonQueue.length === rules.bloonQueueSize
            && currentState.currentBloonSend !== null ? currentState.lastSendTime + rules.bloonSendHoldTime : endTime;

        // Finds the next time an action can be taken
        let nextActionTime = !actionQueue.isEmpty() ? actionQueue.front().time : endTime;

        // Finds the next time a round starts
        let nextRoundStartTime = getNextRoundStartTime(rules, currentState);

        // find next time to simulate to by choosing the earliest event
        currentState.time = Math.min(
            nextEcoTickTime,
            nextBloonSendTime,
            nextBloonSendInputDelayTime,
            nextActionTime,
            nextRoundStartTime,
            endTime
        );
    }
    return states;
}