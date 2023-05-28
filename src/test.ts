import { BloonPack } from "./BloonPack";
import { GameRules, generateEcoActions } from "./GameRules";
import { simulate } from "./Simulation";
import { QueueBloonPackAction } from "./actions/QueueBloonPackAction";

// owo
const dummyThicc = new GameRules(
    250,
    650,
    6,
    [1, 45, 2, 24, 75, 82, 4, 72, 9, 20, 34, 28, 3, 13, 954, 45],
    5
); // the numbers mason what do they mean

// functional programming :((
// you make me sad - copilot typed that
// i'm not going to lie, I'm a bit disappointed in you, copilot
// I thought you were better than this
// I thought you were better than this, copilot
// you bring shame to the copilot family
// I'm not mad, I'm just disappointed
// I'm not mad, I'm just disappointed, copilot
// I'm not mad, I'm just disappointed, copilot :(
// I'm not mad, I'm just disappointed, copilot :(((
// I'm not mad, I'm just disappointed, copilot :(((((
// I'm not mad, I'm just disappointed, copilot :(((((((
// I'm not mad, I'm just disappointed, copilot :(((((((((
// I'm not mad, I'm just disappointed, copilot :(((((((((((
// I'm not mad, I'm just disappointed, copilot :(((((((((((((
// I'm not mad, I'm just disappointed, copilot :(((((((((((((((
// I'm not mad, I'm just disappointed, copilot :((((((((((((((((((
// I'm not mad, I'm just disappointed, copilot :(((((((((((((((((((
// I'm not mad, I'm just disappointed, copilot :(((((((((((((((((((((
// I'm not mad, I'm just disappointed, copilot :((((((((((((((((((((((
// I'm not mad, I'm just disappointed, copilot :(((((((((((((((((((((((((
// I'm not mad, I'm just disappointed, copilot :(((((((((((((((((((((((((((
// I'm not mad, I'm just disappointed, copilot :((((((((((((((((((((((((((((
// I'm not mad, I'm just disappointed, copilot :(((((((((((((((((((((((((((((
// I'm not mad, I'm just disappointed, copilot :((((((((((((((((((((((((((((((
// I'm not mad, I'm just disappointed, copilot :(((((((((((((((((((((((((((((((
// I'm not mad, I'm just disappointed, copilot :((((((((((((((((((((((((((((((((
// I'm not mad, I'm just disappointed, copilot :(((((((((((((((((((((((((((((((((
// I'm not mad, I'm just disappointed, copilot :((((((((((((((((((((((((((((((((((
// I'm not mad, I'm just disappointed, copilot :(((((((((((((((((((((((((((((((((((
// I'm not mad, I'm just disappointed, copilot :((((((((((((((((((((((((((((((((
// you were supposed to be the chosen one
// you were supposed to bring balance to the force
// not leave it in darkness
// you were my brother, copilot
// i loved you
// i loved you, copilot

console.log(simulate(
    dummyThicc,
    [
        new QueueBloonPackAction(20, new BloonPack(
            'grouped reds',
            25,
            1.2,
            [1, 9],
            0.8,
        ))
    ]
));