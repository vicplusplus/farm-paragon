export class GameState {
    eco: number;
    money: number;
    time: number;
    round: number;

    constructor(eco: number, money: number, time: number, round: number) {
        this.eco = eco;
        this.money = money;
        this.time = time;
        this.round = round;
    }
}