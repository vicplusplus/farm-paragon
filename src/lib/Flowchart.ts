import ApplyEcoAction from "./actions/ApplyEcoAction";
import RoundStartAction from "./actions/RoundStartAction";
import type GameRules from "./GameRules";
import Node from "./Node";

/**
 * A flowchart is a tree of actions and their resulting game states.
 * The root node is the starting state.
 * This structure allows the player to conditionally execute actions and see the results.
 * 
 * This requires extensive testing.
 */
export default class Flowchart {

    public stateTree: Node;
    public rules: GameRules;

    /**
     * Creates a new Flowchart
     * Flowcharts are used to generate a tree of actions and resulting game states
     * @param rules The rules of the game
     */
    public constructor(rules: GameRules) {
        this.rules = rules;
        this.stateTree = Flowchart.getStartingStateTree(rules);
    }

    /**
     * Sets the rules
     * This will also reset the state tree
     * @param rules The rules to set
     */
    public setRules = (rules: GameRules): void => {
        this.rules = rules;
        this.stateTree = Flowchart.getStartingStateTree(rules);
    }

    /**
     * Creates a fresh state tree from the current rules
     * Includes all actions that occur regardless of user input: round starts, eco application
     * @param rules The rules of the game
     * @returns A new state tree with all default actions
     */
    public static getStartingStateTree = (rules: GameRules): Node => {
        const stateTree = new Node([null, rules.startingState]);

        const ecoActions: ApplyEcoAction[] = [];
        for (let time = 0; time < Flowchart.getTotalRoundTime(rules); time += rules.ecoInterval) {
            ecoActions.push(new ApplyEcoAction(time));
        }

        const roundStartActions: RoundStartAction[] = [];
        let time = 0;
        for (let i = 0; i <= rules.rounds.length; i++) {
            roundStartActions.push(new RoundStartAction(time + rules.rounds[i].length));
            time += rules.rounds[i].length;
        }

        // Add all actions to the state tree in chronological order
        // kinda like a merge sort but not painful because of linked lists
        let i = 0;
        let j = 0;
        let currentNode = stateTree;
        while (i < ecoActions.length || j < roundStartActions.length) {
            if (i < ecoActions.length && j < roundStartActions.length) {
                if (ecoActions[i].time < roundStartActions[j].time) {
                    currentNode.addChild([ecoActions[i], null]);
                    currentNode = currentNode.children[currentNode.children.length - 1];
                    i++;
                }
                else {
                    currentNode.addChild([roundStartActions[j], null]);
                    currentNode = currentNode.children[currentNode.children.length - 1];
                    j++;
                }
            }
            else if (i < ecoActions.length) {
                currentNode.addChild([ecoActions[i], null]);
                currentNode = currentNode.children[currentNode.children.length - 1];
                i++;
            }
            else {
                currentNode.addChild([roundStartActions[j], null]);
                currentNode = currentNode.children[currentNode.children.length - 1];
                j++;
            }
        }
        return stateTree
    }

    /**
    * Sums the length of all rounds in the given rules.
    * @param rules The rules to read round times from.
     * @returns The total time of all rounds.
     */
    public static getTotalRoundTime = (rules: GameRules): number => rules.rounds.reduce((a, b) => a + b.length, 0);
}