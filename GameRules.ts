import { Action } from "./Action";
import { EcoAction } from "./EcoAction";
import { GameState } from "./GameState";
import { RoundStartAction } from "./RoundStartAction";

export class GameRules {
    startingEco: number;
    startingMoney: number;
    timePerEcoTick: number;
    roundLengths: number[];

    constructor(
        startingEco: number,
        startingMoney: number,
        timePerEcoTick: number,
        roundLengths: number[]
    ) {
        this.startingEco = startingEco;
        this.startingMoney = startingMoney;
        this.timePerEcoTick = timePerEcoTick;
        this.roundLengths = roundLengths;
    }
}

export function generateEcoActions(rules: GameRules): Action[] {
    let actions: Action[] = [];
    for (
        let time = 0;
        time < rules.roundLengths.reduce((total, round) => total += round);
        time += rules.timePerEcoTick
    ) {
        actions.push(new EcoAction(time));
    }
    return actions;
}

export function generateRoundStartActions(rules: GameRules): Action[] {
    let actions: Action[] = [];
    let time: number = 0;
    for (const roundLength of rules.roundLengths) {
        time += roundLength;
        actions.push(new RoundStartAction(time));
    }
    return actions;
}

export function generateInitialGameState(rules: GameRules): GameState {
    return new GameState(
        rules.startingEco,
        rules.startingMoney,
        0,
        0
    )
}