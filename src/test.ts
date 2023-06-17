import { GameRules } from "./GameRules";
import { simulate } from "./Simulation";
import { BloonSendBreakpointAction } from "./actions/BloonSendBreakpointAction";
import { readFileSync } from "fs"

// read rules from data/1.0.0.json
const rules: GameRules = JSON.parse(readFileSync("data/1.0.0.json", "utf8"));

console.log(simulate(
    rules,
    [
        new BloonSendBreakpointAction(6.2, rules.bloonPacks[0])
    ],
    66.2
));