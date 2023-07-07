export interface GameState {
    eco: number;
    money: number;
    time: number;
    currentBloonSendIndex: number; // Keeps track of what bloon the user is currently ecoing with
    lastSendTime: number; // Keeps track of the last time a bloon was sent
    bloonQueue: [number, number][];
}