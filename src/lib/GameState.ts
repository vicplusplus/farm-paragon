import type Bloon from "./Bloon";
import type Tower from "./Tower";
import type Hero from "./Hero";

/**
 * This represent the state of the game at a given time.
 * This is NOT meant to be a single mutable copy, but rather a snapshot of the game state at a given time.
 * This is to be used for later display and cheaper simulation.
 */
export default interface GameState {
    cash: number;
    eco: number;
    time: number;
    round: number;
    towers: Tower[];
    hero: Hero | null;
    bloonQueue: Bloon[];
}