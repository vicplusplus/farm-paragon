import { GameState } from "./GameState";
import { BloonPack } from "./BloonPack";

export interface GameRules {
    startingEco: number;
    startingMoney: number;
    timePerEcoTick: number;
    bloonQueueSize: number;
    roundLengths: number[];
    bloonPacks: BloonPack[];
    bloonSendInputDelay: number;
    bloonSendHoldTime: number;
}

export function generateInitialGameState(rules: GameRules): GameState {
    return {
        eco: rules.startingEco,
        money: rules.startingMoney,
        time: 0,
        lastSendTime: 0,
        currentBloonSendIndex: -1,
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
    while (sum <= time && round < rules.roundLengths.length) {
        sum += rules.roundLengths[round];
        round++;
    }
    return sum > time ? round - 1 : -1;
}

export function getTimeAtRoundStart(rules: GameRules, round: number): number {
    let sum = 0;
    for (let i = 0; i < round && i < rules.roundLengths.length; i++) {
        sum += rules.roundLengths[i];
    }
    return sum;
}

export function getNextRoundStartTime(rules: GameRules, state: GameState): number {
    return getTimeAtRoundStart(rules, getRoundAtTime(rules, state.time) + 1);
}

export function getGameEndTime(rules: GameRules): number {
    let sum = 0;
    for (let i = 0; i < rules.roundLengths.length; i++) {
        sum += rules.roundLengths[i];
    }
    return sum;
}