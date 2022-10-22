import { useReducer } from 'react';
import { Simulate } from './simulation/Simulation';
import rulesJSON from "./simulation/config/1_6.gamerules.json";
import './App.css';

export default function App() {

    // create state variable to store the simulation result
    const [simulationResult, setSimulationResult] = useReducer(() => Simulate(rulesJSON), [[], []]);


    return (
        <div className="App">
            <button onClick={() => { setSimulationResult() }}>Simulate</button>
            <pre>
                <code>
                    {JSON.stringify(simulationResult, null, "\t")}
                </code>
            </pre>
        </div>
    );

}


