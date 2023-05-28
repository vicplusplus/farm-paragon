export class BloonPack {
    name: string;
    price: number;
    eco: number;
    roundsAvailable: [number, number];
    timeToSend: number;

    constructor(
        name: string,
        price: number,
        eco: number,
        roundsAvailable: [number, number],
        timeToSend: number,
    ) {
        this.name = name;
        this.price = price;
        this.eco = eco;
        this.roundsAvailable = roundsAvailable;
        this.timeToSend = timeToSend;
    }
}