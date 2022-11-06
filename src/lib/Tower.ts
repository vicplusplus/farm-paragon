export default interface Tower {
    name: string;
    baseCost: number;
    upgradeCosts: number[][];
    upgrades: number[];
    moneySpent: number;
}
