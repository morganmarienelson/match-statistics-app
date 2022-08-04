import styles from "../css/baselineDataPanel.module.css"
import globalStyles from "../../dashboardComponents/css/pointDashboard.module.css"
import React from 'react';
import {
    Grommet,
} from "grommet/components";
import { Meter } from "grommet";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from "chart.js";
import { Pie } from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

interface PrevBaselineStatsProps {
   stats : any;
    checkSuccess: (value: number)  => string;
}

const PrevBaselineStats: React.FC<PrevBaselineStatsProps> = ({ stats, checkSuccess }) => {
    const percentPointsWonOnBaseline = stats.percentPointsWonOnBaseline;
    const percentBaselinePointsWon = stats.percentBaselinePointsWon;
    const percentPointsWonByWinners= stats.percentPointsWonByWinnersOnBaseline;
    const percentPointsLostByUnforcedError = stats.percentPointsLostByUnforcedErrorOnBaseline;
    const forehandAccuracy = stats.forehandAccuracyOnBaseline;
    const backhandAccuracy = stats.backhandAccuracyOnBaseline;

    const winningShotType = {
        labels: ["Forehand", "Forehand Winner", "Backhand", "Backhand Winner"],
        datasets: [
            {
                label: "Winning Shot Type",
                data: [ stats.pointsWonByForehandOnBaseline,stats.pointsWonByForehandWinnerOnBaseline,stats.pointsWonByBackhandOnBaseline, stats.pointsWonByBackhandWinnerOnBaseline],
                backgroundColor: [
                    "#77e78b",
                    "#e7c377",
                    "#dd7880",
                    "#4b6292",
                ],
                hoverOffset: 4,
            },
        ],
    };

    const losingShotType = {
        labels: ["Missed Forehand", "Forehand Unforced Error", "Missed Backhand", "Backhand Unforced Error"],
        datasets: [
            {
                label: "Losing Shot Type",
                data: [ stats.pointsLostByForehandOnBaseline, stats.pointsLostByForehandUnforcedErrorOnBaseline, stats.pointsLostByBackhandOnBaseline, stats.pointsLostByBackhandUnforcedErrorOnBaseline],
                backgroundColor: [
                    "#19e4e2",
                    "#79c328",
                    "#e0631b",
                    "#97101c",
                ],
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        responsive: true
    };



    const checkPointsWonByWinner = (value: number) => {
        if (value >= 50) {
            return "#129729";
        }
        else {
            return "#7ae200";
        }
    };

    const checkPointsByUnforcedErrors = (value: number) => {
        if (value < 20) {
            return "#129729";
        } else if (value < 40) {
            return "#7ae200";
        } else if (value < 60) {
            return "#ffe91a";
        }
        else if (value < 70) {
            return "#ff6600";
        }
        else {
            return "#de0000";
        }
    };

    return (
        <div>
            <div className={globalStyles.heading}>Baseline Statistics</div>
            <div className={globalStyles.body}>
                <div className={globalStyles.percentagesRow}>
                    <div className={globalStyles.percentagesCol}>
                        <div className={globalStyles.percentagesHeading}>Total Points Won On Baseline</div>
                        <div className={globalStyles.meter}>
                            <Grommet>
                                <Meter
                                    value={percentPointsWonOnBaseline}
                                    type="circle"
                                    margin="small"
                                    size="small"
                                    thickness="medium"
                                    background="components/statisticsComponents/prevStatsComponents/prevBaselineStats#B2B2B2"
                                    color={checkSuccess(percentPointsWonOnBaseline)}
                                />
                            </Grommet>
                            <div className={globalStyles.percent}>{percentPointsWonOnBaseline}%</div>
                        </div>
                    </div>
                    <div className={globalStyles.percentagesCol}>
                        <div className={globalStyles.percentagesHeading}>Baseline Points Won</div>
                        <div className={globalStyles.meter}>
                            <Grommet>
                                <Meter
                                    value={percentBaselinePointsWon}
                                    type="circle"
                                    margin="small"
                                    size="small"
                                    thickness="medium"
                                    background="components/statisticsComponents/prevStatsComponents/prevBaselineStats#B2B2B2"
                                    color={checkSuccess(percentBaselinePointsWon)}
                                />
                            </Grommet>
                            <div className={globalStyles.percent}>{percentBaselinePointsWon}%</div>
                        </div>
                    </div>
                    <div className={globalStyles.percentagesCol}>
                        <div className={globalStyles.percentagesHeading}>Points Won By Winners</div>
                        <div className={globalStyles.meter}>
                            <Grommet>
                                <Meter
                                    value={percentPointsWonByWinners}
                                    type="circle"
                                    margin="small"
                                    size="small"
                                    thickness="medium"
                                    color={checkPointsWonByWinner(percentPointsWonByWinners)}
                                    background="components/statisticsComponents/prevStatsComponents/prevBaselineStats#B2B2B2"
                                />
                            </Grommet>
                            <div className={globalStyles.percent}>{percentPointsWonByWinners}%</div>
                        </div>
                    </div>
                    <div className={globalStyles.percentagesColLastCol}>
                        <div className={globalStyles.percentagesHeading}>Points Lost by Unforced Error</div>
                        <div className={globalStyles.meter}>
                            <Grommet>
                                <Meter
                                    value={percentPointsLostByUnforcedError}
                                    type="circle"
                                    margin="small"
                                    size="small"
                                    thickness="medium"
                                    color={checkPointsByUnforcedErrors(percentPointsLostByUnforcedError)}
                                    background="components/statisticsComponents/prevStatsComponents/prevBaselineStats#B2B2B2"

                                />
                            </Grommet>
                            <div className={globalStyles.percent}>{percentPointsLostByUnforcedError}%</div>
                        </div>
                    </div>
                </div>
                <div className={globalStyles.rowHeading}>Baseline Shot Break Down</div>
                <div className={globalStyles.border}></div>
                <div className={styles.row}>
                    <div className={styles.doughnutChartCol}>
                        <div className={styles.pieHeader}>Winning Shot Types</div>
                        <div className={styles.doughnutChart}>
                            <Pie data={winningShotType} options={options} />
                        </div>
                    </div>
                    <div className={styles.doughnutChartCol}>
                        <div className={styles.pieHeader}>Losing Shot Types</div>
                        <div className={styles.doughnutChart}>
                            <Pie data={losingShotType} options={options} />
                        </div>
                    </div>
                    <div className={styles.accuracy}>
                        <div className={styles.accuracyCol}>
                            <div className={styles.accuracyMeterHeading}>Forehand Accuracy: {forehandAccuracy}%</div>
                            <div className={styles.meter}>
                                <Grommet>
                                    <Meter
                                        value={forehandAccuracy}
                                        type="circle"
                                        margin="small"
                                        size="small"
                                        thickness="medium"
                                        background="components/statisticsComponents/prevStatsComponents/prevBaselineStats#B2B2B2"
                                        color={checkSuccess(forehandAccuracy)}
                                    />
                                </Grommet>
                            </div>
                        </div>
                        <div className={styles.accuracyCol}>
                            <div className={styles.accuracyMeterHeading}>Backhand Accuracy: {backhandAccuracy}%</div>
                            <div className={styles.meter}>
                                <Grommet>
                                    <Meter
                                        value={backhandAccuracy}
                                        type="circle"
                                        margin="small"
                                        size="small"
                                        thickness="medium"
                                        background="components/statisticsComponents/prevStatsComponents/prevBaselineStats#B2B2B2"
                                        color={checkSuccess(backhandAccuracy)}
                                    />
                                </Grommet>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrevBaselineStats;
