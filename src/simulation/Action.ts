export class Action {
    public actionType: ActionType;
    public time: number;

    constructor(actionType: ActionType, time: number) {
        this.actionType = actionType;
        this.time = time;
    }
}

export enum ActionType {
    BuyTower,
    SellTower,
    UpgradeTower
}
