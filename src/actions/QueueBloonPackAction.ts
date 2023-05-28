import { Action } from "./Action";
import { GameRules } from "../GameRules";
import { GameState } from "../GameState";
import { BloonPack } from "../BloonPack";
import { SendBloonPackAction } from "./SendBloonPackAction";

export class QueueBloonPackAction implements Action {
    time: number;
    bloons: BloonPack;
    forced: boolean = false;

    constructor(time: number, bloons: BloonPack) {
        this.time = time;
        this.bloons = bloons;
    }

    apply(rules: GameRules, state: GameState): Action {
        state.money -= this.bloons.price;
        state.eco += this.bloons.eco;
        state.bloonQueue.push(this.bloons);
        return new SendBloonPackAction(
            state.time + state.bloonQueue
                .map(e => e.timeToSend)
                .reduce((t, b) => t += b),
            this.bloons
        )
    }

    verify(rules: GameRules, state: GameState) {
        if (state.money < this.bloons.price) {
            throw new Error(
                `Not enough money to queue this bloon pack.`
                + `\nCost: ${this.bloons.price}\nMoney: ${state.money}`);
        }
        if (state.round < this.bloons.roundsAvailable[0] || state.round > this.bloons.roundsAvailable[1]) {
            throw new Error(
                `Cannot send ${this.bloons.name} at this round.`
                + `\nAvailable rounds: [${this.bloons.roundsAvailable[0]}, ${this.bloons.roundsAvailable[1]}]`
                + `\nCurrent round: ${state.round}`
            )
        }
        if (state.bloonQueue.length >= rules.bloonQueueSize) {
            throw new Error(
                `Cannot add bloon pack to full queue.`
                + `\nMax queue size: ${rules.bloonQueueSize}`
                + `\nCurrent queue: ${JSON.stringify(state.bloonQueue)}`
            )
        }
    }
}