import MatchStats from "./matchStats";
import PointDashboard from "./pointDashboard";
import {useState} from "react";

function PointInput() {
    const [showDashboard, setShowDashboard] = useState(true);

    return (
        <>
            {showDashboard ? (
                <PointDashboard setShowDashboard={setShowDashboard}
                />
            ) : (
                <MatchStats setShowDashboard={setShowDashboard}/>
            )}
        </>
    );
}

export default PointInput;
