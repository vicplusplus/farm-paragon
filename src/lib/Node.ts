import type Action from "./actions/Action";
import type GameRules from "./GameRules";
import type GameState from "./GameState";

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
}