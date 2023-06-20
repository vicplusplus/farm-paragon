import { GameState } from "./GameState";
import { BloonPack } from "./BloonPack";

export type GameRules = {
    startingEco: number;
    startingMoney: number;
    timePerEcoTick: number;
    bloonQueueSize: number;
    roundLengths: number[];
    bloonPacks: { [key: string]: BloonPack }
    bloonSendInputDelay: number;
    bloonSendHoldTime: number;
}

export function generateInitialGameState(rules: GameRules): GameState {
    return {
        eco: rules.startingEco,
        money: rules.startingMoney,
        time: 0,
        lastSendTime: 0,
        currentBloonSend: null,
        bloonQueue: [],
        cooldowns: []
    }
}

export function getRoundAtTime(rules: GameRules, time: number): number {
    // Starts at round 0 and keeps adding round lengths until the sum is greater than the time
    // A time equal to the end of a round is considered to be the start of the next round
    // This is done to prevent time 0 from being considered round -1
    let round = 0;
    let sum = 0;
    while (sum <= time) {
        sum += rules.roundLengths[round];
        round++;
    }
    return round - 1;
}

export function getTotalTimeAtRound(rules: GameRules, round: number): number {
    let sum = 0;
    for (let i = 0; i < round; i++) {
        sum += rules.roundLengths[i];
    }
    return sum;
}

export function getNextRoundStartTime(rules: GameRules, state: GameState): number {
    return getTotalTimeAtRound(rules, getRoundAtTime(rules, state.time) + 1);
}