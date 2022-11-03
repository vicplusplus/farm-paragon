import { useState } from "react";
import Action from "../simulation/actions/Action";


export default function Timeline() {

    // timeline contents are a list of Actions
    const [actions, setActions] = useState<Action[]>([]);

    return (
        <div className="Timeline">

        </div>
    );
}