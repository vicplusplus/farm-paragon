import React from 'react';
import Simulate from './simulation/Simulation';
import rulesJSON from "./simulation/config/1_6.gamerules.json";
import './App.css';

export default function App() {

    Simulate(rulesJSON, []);

    return (
        <div className="App">
            <h1>{"check console idiot"}</h1>
        </div>
    );
}


