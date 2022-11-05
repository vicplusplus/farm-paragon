export default interface Tower {
    name: string;
    isHero: boolean;
    baseCost: number;
    upgradeCosts: number[][];
    upgrades?: number[];
    moneySpent?: number;
}
