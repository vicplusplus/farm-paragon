import type GameState from "../GameState";
import type Action from "./Action";
import type Tower from "../Tower";

export default class UpgradeTowerAction implements Action {
    public time: number;
    public tower: Tower;
    public targetUpgrades: number[];

    apply(state: GameState): GameState {
        return {
            ...state,
            cash: state.cash - this.cost(),
            towers: state.towers.map(t => {
                if (t === this.tower) {
                    return {
                        ...t,
                        upgrades: this.targetUpgrades,
                        moneySpent: t.moneySpent + this.cost()
                    }
                }
                return t;
            })
        };
    }

    validate(state: GameState): boolean {
        // is the tower in the list?
        if (!state.towers.includes(this.tower)) return false;
        // are any of the upgrades less than the current upgrade?
        if (this.targetUpgrades.some((upgrade, index) => upgrade < this.tower.upgrades[index])) return false;
        // is there enough cash?
        if (state.cash < this.cost()) return false;

        return true;
    }

    cost = (): number => {
        return this.targetUpgrades.reduce((cost, upgrade, index) => {
            // iterate upgrades from tower.upgrades to targetUpgrades and sum the cost
            for (let i = this.tower.upgrades[index]; i < upgrade; i++) {
                cost += this.tower.upgradeCosts[index][i];
            }
            return cost;
        });
    }


    constructor(time: number, tower: Tower, upgrades: number[]) {
        this.time = time;
        this.tower = tower;
        this.targetUpgrades = upgrades;
    }
}
