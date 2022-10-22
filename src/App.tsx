import React, { useEffect } from 'react';
import Simulate from './simulation/Simulation';
import rulesJSON from "./simulation/config/1_6.gamerules.json";
import './App.css';
import GameState from './simulation/GameState';

export default function App() {

    // create state variable to store the simulation result
    const [simulationResult, setSimulationResult] = React.useState<GameState[]>([]);

    useEffect(() => {
        // run the simulation
        const result = Simulate(rulesJSON);

        // store the result in the state variable
        setSimulationResult(result);
    }, []);


    return (
        <div className="App">
            <pre>
                <code>
                    {JSON.stringify(simulationResult, null, "\t")}
                </code>
            </pre>
        </div>
    );

}


