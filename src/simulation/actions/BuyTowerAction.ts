import GameRules from "../GameRules";
import GameState from "../GameState";
import Tower from "../Tower";
import Action from "./Action";

export class BuyTowerAction implements Action {
    public type: string = "BuyTowerAction";
    public time: number;
    public priority: number;
    public tower: Tower;

    apply(state: GameState, rules: GameRules): void {
        state.towers.push(this.tower);
        state.cash -= this.tower.baseCost;
        this.tower.moneySpent! += this.tower.baseCost;
    }

    constructor(time: number, priority: number, tower: Tower) {
        this.time = time;
        this.priority = priority;
        this.tower = tower;
        // add as many upgrade paths as there are upgradeCost paths

        this.tower.upgrades ??= this.tower.upgradeCosts.map(() => 0);
        this.tower.moneySpent = 0;
    }
}