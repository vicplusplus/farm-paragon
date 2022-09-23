export default class Tower {
    public name: string;
    public isHero: boolean;
    public baseCost: number;
    public upgradeCosts: number[][];
    public upgrades: number[];

    constructor(name: string, baseCost: number, upgradeCosts: number[][], upgrades: number[], isHero: boolean = false) {
        this.name = name;
        this.baseCost = baseCost;
        this.upgradeCosts = upgradeCosts;
        this.upgrades = upgrades;
        this.isHero = isHero;
    }
}
