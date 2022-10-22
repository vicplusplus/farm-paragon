import GameRules from "../GameRules";
import GameState from "../GameState";
import Tower from "../Tower";
import Action from "./Action";

export class SellTowerAction implements Action {
    public type: string = "SellTowerAction";
    public time: number;
    public priority: number;
    public tower: Tower;

    apply(state: GameState, rules: GameRules, actions: Action[]): void {
        state.cash += this.tower.moneySpent! * rules.sellMultiplier;
        // potentially has problems with exact duplicate towers, but that shouldn't have any effect on the simulation
        state.towers.splice(state.towers.indexOf(this.tower));
    }

    constructor(time: number, priority: number, tower: Tower) {
        this.time = time;
        this.priority = priority;
        this.tower = tower;
        // add as many upgrade paths as there are upgradeCost paths

        this.tower.upgrades ??= this.tower.upgradeCosts.map(() => 0);
    }
}