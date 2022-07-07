import {Button, message, Modal} from "antd";
import "antd/dist/antd.css";
import React, {useState} from "react";
import ReturnPanel from "./components/returnPanel";
import ServingPanel from "./components/servingPanel";
import LostPointModal from "./components/lostPointModal";
import WonPointModal from "./components/wonPointModal";
import styles from "./components/css/pointDashboard.module.css";
import {Undo} from "grommet-icons";

interface PointDashboardProps {
    setShowDashboard: (showDashboard: boolean) => void;
}

const PointDashboard: React.FC<PointDashboardProps> = ({
                                                           setShowDashboard,
                                                       }) => {
    const [showServeButtons, setShowServeButtons] = useState(false);
    const [showReturnButtons, setShowReturnButtons] = useState(false);
    const [losingModalVisible, setLosingModalVisible] = useState(false);
    const [winningModalVisible, setWinningModalVisible] = useState(false);

    const pointFinished = () => {
        message.success("Point has been recorded", 1);
        setShowServeButtons(false);
        setShowReturnButtons(false);
    };

    const confirmStop = () => {
        Modal.confirm({
            title: "Are you sure you want to stop recording data for this match?",
            okType: "danger",
            onOk: () => {
                setShowDashboard(false);
            },
        });
    };

    const onWinningButtonClick = () => {
        setWinningModalVisible(true);
    };

    const onLosingButtonClick = () => {
        setLosingModalVisible(true);
    };

    const onModalCancel = () => {
        setLosingModalVisible(false);
        setWinningModalVisible(false);
        setShowServeButtons(false);
        setShowReturnButtons(false);
    };


    return (
        <div className={styles.page}>
            <div className={styles.row}>
                <div className={styles.col}>
                    <ReturnPanel
                        showReturnButtons={showReturnButtons}
                        setShowReturnButtons={setShowReturnButtons}
                        pointFinished={pointFinished}
                        setShowServeButtons={setShowServeButtons}
                        onWinningButtonClick={onWinningButtonClick}
                        onLosingButtonClick={onLosingButtonClick}
                    />
                </div>
                <div className={styles.col}>
                    <ServingPanel
                        showServeButtons={showServeButtons}
                        setShowReturnButtons={setShowReturnButtons}
                        setShowServeButtons={setShowServeButtons}
                        pointFinished={pointFinished}
                        onWinningButtonClick={onWinningButtonClick}
                        onLosingButtonClick={onLosingButtonClick}
                        confirmStop={confirmStop}
                    />
                </div>
            </div>

            <LostPointModal
                losingModalVisible={losingModalVisible}
                setLosingModalVisible={setLosingModalVisible}
                onModalCancel={onModalCancel}
                pointFinished={pointFinished}
            />

            <WonPointModal
                winningModalVisible={winningModalVisible}
                setWinningModalVisible={setWinningModalVisible}
                pointFinished={pointFinished}
                onModalCancel={onModalCancel}
            />
        </div>
    );
};

export default PointDashboard;
