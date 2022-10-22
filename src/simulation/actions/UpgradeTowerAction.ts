import GameRules from "../GameRules";
import GameState from "../GameState";
import Action from "./Action";
import Tower from "../Tower";

export default class UpgradeTowerAction implements Action {
    public time: number;
    public priority: number;
    public tower: Tower;
    public targetUpgrades: number[];

    apply(state: GameState, rules: GameRules, actions: Action[]): void {
        // if any of the upgrades are less than the current upgrade, then we can't upgrade
        if (this.targetUpgrades.some((upgrade, index) => upgrade < this.tower.upgrades![index])) return;

        // determine cost of upgrades
        const cost = this.targetUpgrades.reduce((cost, upgrade, index) => {
            // iterate upgrades from tower.upgrades to targetUpgrades and sum the cost
            for (let i = this.tower.upgrades![index]; i < upgrade; i++) {
                cost += this.tower.upgradeCosts[index][i];
            }
            return cost;
        });

        // if we can't afford the upgrades, then we can't upgrade
        if (state.cash < cost) return;

        // apply upgrades
        this.tower.upgrades = this.targetUpgrades;
        state.cash -= cost;
        this.tower.moneySpent! += cost;
    }

    constructor(time: number, priority: number, tower: Tower, upgrades: number[]) {
        this.time = time;
        this.priority = priority;
        this.tower = tower;
        this.targetUpgrades = upgrades;
    }
}
