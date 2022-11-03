import { createContext, useState, PropsWithChildren, useContext } from "react";
import GameState from "../simulation/GameState";

const simulationContext = createContext<Simulation>({
    gameStates: []
});

export interface Simulation {
    gameStates: GameState[];
}

export function SimulationContext({
    children
}: PropsWithChildren<{}>) {
    let res = useSimulationContext();

    return (
        <simulationContext.Provider value={{
            gameStates: []
        }}>
            {children}
        </simulationContext.Provider>
    )
}

export function useSimulationContext() {
    return useContext(simulationContext);
}