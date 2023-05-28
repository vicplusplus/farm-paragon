import { BloonPack } from "./BloonPack";

export class GameState {
    eco: number;
    money: number;
    time: number;
    round: number;
    bloonQueue: BloonPack[];

    constructor(eco: number, money: number, time: number, round: number, bloonQueue: BloonPack[]) {
        this.eco = eco;
        this.money = money;
        this.time = time;
        this.round = round;
        this.bloonQueue = bloonQueue;
    }
}