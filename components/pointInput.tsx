import NewMatchStatsDisplay from "./statisticsComponents/newStatsComponents/newMatchStatsDisplay";
import PointDashboard from "./dashboardComponents/pointDashboard";
import {useState} from "react";
import {useMachine} from "@xstate/react";
import {matchData} from "../machines/matchData";

function PointInput() {
    const [showDashboard, setShowDashboard] = useState(true);
    const [state, send] = useMachine(matchData);

    return (
        <>
            {showDashboard ? (
                <>
                    <PointDashboard setShowDashboard={setShowDashboard} send={send}/>

                </>
            ) : (
                <NewMatchStatsDisplay setShowDashboard={setShowDashboard} state={state}/>
            )}
        </>
    );
}

export default PointInput;
