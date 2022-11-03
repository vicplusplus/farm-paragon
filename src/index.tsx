import { createRoot } from 'react-dom/client';
import { StrictMode, useContext } from "react";
import { SimulationContext } from './contexts/SimulationContext';

console.log(document.getElementById("root"));
const root = createRoot(document.getElementById("root")!);

root.render(
    <StrictMode>
        <SimulationContext>
            <div>
                <h1>Under Construction...</h1>
            </div>
        </SimulationContext>
    </StrictMode>
);