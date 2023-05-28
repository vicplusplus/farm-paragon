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

    verify(rules: GameRules, state: GameState): boolean {
        return (
            state.money >= this.bloons.price
            && state.round >= this.bloons.roundsAvailable[0]
            && state.round <= this.bloons.roundsAvailable[1]
            && state.bloonQueue.length < rules.bloonQueueSize
        );
    }
}