import { BloonPack } from "./BloonPack";
import { Cooldown } from "./Cooldown";


export type GameState = {
    eco: number;
    money: number;
    time: number;
    // By adding a currentBloonSend, we can remove the need for action generators entirely
    currentBloonSend: BloonPack | null;
    lastSendTime: number;
    bloonQueue: [BloonPack, number][];
    cooldowns: Cooldown[];
}