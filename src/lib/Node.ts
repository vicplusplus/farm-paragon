import type Action from "./actions/Action";
import type GameRules from "./GameRules";
import type GameState from "./GameState";

/**
 * This represents the state of the game at a given time with the action that was applied to get there.
 * This is used to traverse the game state tree, and also contains important functions for validating and applying actions.
 */
export default class Node {
    /**
     * An action with its resulting game state.
     * The action is null for the root node.
     * Nodes with null game states are considered unresolved.
     */
    public value: [Action | null, GameState | null];
    public parent: Node | null;
    public children: Node[];

    /**
     * Creates a new Node
     * @param value The value of the node
     * @param parent The parent of the node
     */
    constructor(value: [Action | null, GameState | null], parent: Node | null = null) {
        this.value = value;
        this.parent = parent;
        this.children = [];
    }

    /**
     * Creates a new node with the given value and adds it to the children of this node
     * @param value The value to add to the node
     * @returns The newly created node
     */
    public addChild = (value: [Action | null, GameState | null]): Node => {
        const child = new Node(value, this);
        this.children.push(child);
        return child;
    }

    /**
     * Validates the action against the parent state and the rules
     * @param rules The rules to apply
     * @returns Whether the action is valid or not
     */
    public validate = (rules: GameRules): boolean => {
        const action = this.value[0];
        const parentState = this.parent?.value[1] ?? null;

        if (action === null) return true;
        if (parentState === null) return true;

        return action.validate(parentState, rules);
    }

    /**
     * Resolves the GameState of a Node
     * Applies the action to the parent state if it's valid
     * Returns the resulting state, or null if the action is invalid or the parent state is null
     * 
     * IMPORTANT:
     * The GameState of a node will not necessarily be accurate, so it is important to resolve a node and its children before reading the GameState.
     * Do not use this function to resolve an intermediate node, as it will not resolve the children.
     * @param rules The rules to apply
     * @returns Whether the node was successfully resolved or not
     */
    public resolve = (rules: GameRules): boolean => {
        const action = this.value[0];
        const parentState = this.parent?.value[1] ?? null;

        if (action === null) return false;
        if (parentState === null) return false;
        if (!this.validate(rules)) return false;

        this.value[1] = action.apply(parentState, rules);
        return true;
    }

    /**
     * Resolves a single branch of the tree
     * starts at this node and ends at the given node if it's a descendant of this node
     * @param rules The rules to apply
     * @param endingNode The node to stop at
     * @returns Whether the branch was successfully resolved or not
     */
    public resolveBranch = (rules: GameRules, endingNode: Node): boolean => {

        // Check if the ending node is a descendant of this node
        // At the same time, add all nodes to an array
        let currentNode: Node | null = endingNode;
        const nodes: Node[] = [];
        while (currentNode !== null) {
            nodes.push(currentNode);
            if (currentNode === this) break;
            currentNode = currentNode.parent;
        }
        if (currentNode === null) return false; // the ending node is not a descendant of this node

        // Resolve the branch
        // Iterate through the nodes in reverse order because we want to resolve the root node first
        for (let i = nodes.length - 1; i >= 0; i--) {
            const node = nodes[i];
            if (!node.resolve(rules)) return false;
        }
        return true;
    }

    /**
     * Resolves a node and all of its children
     * This is a recursive function, and should be used sparingly.
     * This should not be used for optimization, only for when users input an intermediate action.
     * @param rules The rules to apply
     * @returns Whether the node and all of its children were successfully resolved or not
     */
    public resolveChildren = (rules: GameRules): boolean => {
        if (!this.resolve(rules)) return false;
        for (const child of this.children) {
            if (!child.resolveChildren(rules)) return false;
        }
        return true;
    }
}