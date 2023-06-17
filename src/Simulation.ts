import { GameRules, generateInitialGameState, getNextRoundStartTime, getRoundAtTime } from "./GameRules";
import { GameState } from "./GameState";
import { IAction } from "./actions/IAction";
import { QueueBloonPackAction } from "./actions/QueueBloonPackAction";
import { clone } from "./util";
import { PriorityQueue } from "@datastructures-js/priority-queue";

export function simulate(rules: GameRules, actions: IAction[], endTime: number, initialState: GameState = generateInitialGameState(rules)): GameState[] {

    let actionQueue = PriorityQueue.fromArray(
        actions.filter(a => a.time >= initialState!.time && a.time <= endTime),
        (a, b) => a.time - b.time
    );

    let currentState = clone(initialState);

    let states = [clone(currentState)];

    while (currentState.time < endTime) {
        // check if can apply eco tick
        if (currentState.time % rules.timePerEcoTick === 0) {
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
        while (currentState.currentBloonSend !== null && currentState.money >= currentState.currentBloonSend.price && currentState.bloonQueue.length < rules.bloonQueueSize) {
            let action = new QueueBloonPackAction(currentState.time, currentState.currentBloonSend)
            action.verify(rules, currentState);
            action.apply(rules, currentState);
        }

        // find next time to simulate to
        currentState.time = Math.min(
            currentState.time + (rules.timePerEcoTick - (currentState.time % rules.timePerEcoTick)),
            currentState.bloonQueue.length > 0 ? currentState.bloonQueue[0][1] : endTime,
            !actionQueue.isEmpty() ? actionQueue.front().time : endTime,
            getNextRoundStartTime(rules, currentState),
            endTime
        );

        states.push(clone(currentState));
    }
    return states;
}