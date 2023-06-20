import { BloonPack } from "./BloonPack";
import { Cooldown } from "./Cooldown";


export type GameState = {
    eco: number;
    money: number;
    time: number;
    currentBloonSend: BloonPack | null; // Keeps track of what bloon the user is currently ecoing with
    lastSendTime: number; // Keeps track of the last time a bloon was sent
    bloonQueue: [BloonPack, number][];
    cooldowns: Cooldown[];
}