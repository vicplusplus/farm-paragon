import { BloonPack } from "./BloonPack";
import { GameRules } from "./GameRules";
import { simulate } from "./Simulation";
import { BloonSendBreakpointAction } from "./actions/BloonSendBreakpointAction";
import { QueueBloonPackAction } from "./actions/QueueBloonPackAction";
import { readFileSync } from "fs"


const bloonPacks: { [key: string]: BloonPack } = {
    groupedReds: {
        name: "groupedReds",
        price: 25,
        eco: 1.2,
        roundsAvailable: [1, 9],
        timeToSend: 0.8
    }
}

// read rules from data/1.0.0.json
const rules: GameRules = JSON.parse(readFileSync("data/1.0.0.json", "utf8"));

console.log(simulate(
    rules,
    [
        new BloonSendBreakpointAction(6.2, rules.bloonPacks[0])
    ],
    66.2
));