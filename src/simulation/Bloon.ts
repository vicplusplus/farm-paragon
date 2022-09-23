export default class Bloon {
    public name: string;
    public cost: number;
    public eco: number;
    public timeToSend: number;
    public firstRoundAvailable: number;
    public lastRoundAvailable: number;

    constructor(name: string, cost: number, eco: number, timeToSend: number, firstRoundAvailable: number, lastRoundAvailable: number) {
        this.name = name;
        this.cost = cost;
        this.eco = eco;
        this.timeToSend = timeToSend;
        this.firstRoundAvailable = firstRoundAvailable;
        this.lastRoundAvailable = lastRoundAvailable;
    }
}