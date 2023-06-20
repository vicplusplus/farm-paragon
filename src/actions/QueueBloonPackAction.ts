import { IAction } from "./IAction";
import { GameRules, getRoundAtTime } from "../GameRules";
import { GameState } from "../GameState";
import { BloonPack } from "../BloonPack";
import { EPSILON } from "../constants";

export class QueueBloonPackAction implements IAction {
    time: number;
    bloons: BloonPack;

    constructor(time: number, bloons: BloonPack) {
        this.time = time;
        this.bloons = bloons;
    }

    apply(rules: GameRules, state: GameState): void {
        state.money -= this.bloons.price;
        state.eco += this.bloons.eco;
        // get time of bloon in back of queue and add current bloon pack's time to send
        let time = state.bloonQueue.length > 0 ? state.bloonQueue[state.bloonQueue.length - 1][1] : state.time;
        state.bloonQueue.push([this.bloons, time + this.bloons.timeToSend]);
        state.lastSendTime = state.time;
    }

    verify(rules: GameRules, state: GameState): void {
        let round = getRoundAtTime(rules, this.time - rules.bloonSendInputDelay);
        if (state.money < this.bloons.price) {
            throw new Error('Not enough money to queue this bloon pack.');
        }
        if (round < this.bloons.roundsAvailable[0] || round > this.bloons.roundsAvailable[1]) {
            throw new Error(`Cannot send ${this.bloons.name} on round ${round}.`);
        }
        if (state.bloonQueue.length > rules.bloonQueueSize) {
            throw new Error('Cannot add bloon pack to full queue.');
        }
        if (state.time - state.lastSendTime - rules.bloonSendHoldTime < -EPSILON) {
            throw new Error(`Cannot send another bloon pack yet, need to wait for the bloon send hold time.`);
        }
    }
}
