import type GameRules from "../GameRules";
import type GameState from "../GameState";
import type Tower from "../Tower";
import type Action from "./Action";

export class BuyTowerAction implements Action {
    public time: number;
    public tower: Tower;

    apply(state: GameState): GameState {
        return {
            ...state,
            cash: state.cash - this.tower.baseCost,
            towers: [
                ...state.towers, {
                    ...this.tower,
                    moneySpent: this.tower.baseCost,
                }
            ]
        }
    }

    validate(state: GameState, rules: GameRules): boolean {
        // is the action in the past?
        if (state.time >= this.time) return false;
        // is there not enough cash?
        if (state.cash < this.tower.baseCost) return false;
        // is the tower not selected?
        const selectedTowers = rules.selectedTowersIndices.map(i => rules.availableTowers[i]);
        if (!selectedTowers.includes(this.tower)) return false;
        // otherwise, it's valid
        return true;
    }

    constructor(time: number, tower: Tower) {
        this.time = time;
        this.tower = tower;
    }
}