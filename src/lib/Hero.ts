/**
 * This represents a hero tower.
 * 
 * #TODO: Implement hero xp curves
 */
export default interface Hero {
    name: string;
    baseCost: number;
    levelCosts: number[];
    level: number;
    moneySpent: number;
}
