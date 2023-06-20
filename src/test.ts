import { GameRules } from "./GameRules";
import { simulate } from "./Simulation";
import { BloonSendBreakpointAction } from "./actions/BloonSendBreakpointAction";
import { readFileSync } from "fs"
import { QueueBloonPackAction } from "./actions/QueueBloonPackAction";

// read rules from data/1.0.0.json
const rules: GameRules = JSON.parse(readFileSync("data/1.0.0.json", "utf8"));

const results = simulate(
    rules,
    [
        new BloonSendBreakpointAction(6, rules.bloonPacks[0])
    ],
    66.2,
);

console.log(results.map(r => ({
    time: Math.floor(r.time * 10) / 10,
    money: Math.floor(r.money),
    eco: Math.floor(r.eco),
})));