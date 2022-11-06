import type GameRules from "../GameRules";
import type GameState from "../GameState";
import type Tower from "../Tower";
import type Action from "./Action";

export class SellTowerAction implements Action {
    public time: number;
    public tower: Tower;

    apply(state: GameState, rules: GameRules): GameState {
        state.cash += this.tower.moneySpent * rules.sellMultiplier;
        // potentially has problems with exact duplicate towers, but that shouldn't have any effect on the simulation
        state.towers.splice(state.towers.indexOf(this.tower));

        return {
            ...state,
            cash: state.cash + this.tower.moneySpent * rules.sellMultiplier,
            towers: state.towers.filter(t => t !== this.tower) // remove the tower from the list
        }
    }

    validate(state: GameState): boolean {
        // is the tower in the list?
        if (!state.towers.includes(this.tower)) return false;
        return true;
    }

    constructor(time: number, tower: Tower) {
        this.time = time;
        this.tower = tower;
    }
}