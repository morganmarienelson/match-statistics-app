import {useEffect, useState} from "react";
import {getSession, signIn} from "next-auth/react";
import styles from "../../css/matchLog.module.css"

function StatisticsPage(props){
    const [loading, setLoading] = useState(true)
    const [matches, setMatches] = useState([])

    useEffect(() => {
        const fetchMatches = async () => {
            const response = await fetch('api/matches')
            const data = await response.json();
            setMatches(data)
        }
        const securePage = async () => {
            const session = await getSession();
            if (!session) {
                signIn()
            } else {
                setLoading(false);
            }
        }
        securePage();
        fetchMatches();
    }, [])

    if (loading) {
        return <h2>Loading...</h2>
    }

    // const showMatchHandler = () => {
    //     router.push('/matchLog/' + props.id)
    // }

    return(
        <div>
            {matches.map((match) => {
                return (
                        <div key={match.id} className={styles.matchLog}>
                            <div className={styles.names}>
                           {/*<a onClick={showMatchHandler}>*/}
                               {match.playerName} vs {match.opponentName}
                           {/*</a>*/}
                            </div>
                            <div className={styles.names}>
                                {match.id}
                            </div>
                        </div>
                )
            })}
        </div>

    )
}

export default StatisticsPage;