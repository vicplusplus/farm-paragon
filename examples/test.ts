import { GameRules, getTimeAtRoundStart } from "../src/GameRules";
import { simulate } from "../src/Simulation";
import { BloonSendBreakpointAction } from "../src/actions/BloonSendBreakpointAction";
import { readFileSync, writeFileSync } from "fs"

// read rules from data/1.0.0.json
const rules: GameRules = JSON.parse(readFileSync("data/1.0.0.json", "utf8"));

const results = simulate(
    rules,
    [
        new BloonSendBreakpointAction(getTimeAtRoundStart(rules, rules.bloonPacks[0].roundsAvailable[0]), 0),
        new BloonSendBreakpointAction(getTimeAtRoundStart(rules, rules.bloonPacks[2].roundsAvailable[0]), 2),
        new BloonSendBreakpointAction(getTimeAtRoundStart(rules, rules.bloonPacks[4].roundsAvailable[0]), 4),
        new BloonSendBreakpointAction(getTimeAtRoundStart(rules, rules.bloonPacks[6].roundsAvailable[0]), 6),
        new BloonSendBreakpointAction(getTimeAtRoundStart(rules, rules.bloonPacks[8].roundsAvailable[0]), 8),
        new BloonSendBreakpointAction(getTimeAtRoundStart(rules, rules.bloonPacks[14].roundsAvailable[0]), 14),
    ],
    8
);

writeFileSync("results.json", JSON.stringify(results, null));