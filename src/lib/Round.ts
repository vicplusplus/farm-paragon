/**
 * This represents a round.
 * Eventually this may have to contain RBE (Red Bloon Equivalent) or bloon count for Ben in particular
 * but for now, all that matters to regular eco is the length of the base length of the round and how long it's stalled.
 * 
 * #TODO: Implement stall time
 */
export default interface Round {
    roundNumber: number;
    length: number;
}