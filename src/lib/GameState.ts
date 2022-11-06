import type Bloon from "./Bloon";
import type Tower from "./Tower";
import type Hero from "./Hero";

export default interface GameState {
    cash: number;
    eco: number;
    time: number;
    round: number;
    towers: Tower[];
    hero: Hero | null;
    bloonQueue: Bloon[];
}