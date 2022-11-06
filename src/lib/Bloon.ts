/**
 * This interface represents a bloon send.
 * Not much else to add here.
 */
export default interface Bloon {
    name: string;
    cost: number;
    eco: number;
    timeToSend: number;
    firstRoundAvailable: number;
    lastRoundAvailable: number;
}