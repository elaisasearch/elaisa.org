import React from "react";
import memeteam from "../../assets/img/memeteam.png";
import styles from "../../assets/jss/MemeTeamStyle";

const MemeTeam = () => {
    return (
        <div style={styles.polaroid}>
            <a
                href="https://github.com/dasmemeteam/language-level-search-engine"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src={memeteam} alt="MemeTeam" style={styles.polaroidImage} />
            </a>
            <div style={styles.polaroidText}>
                <p>Jenny, Paula, Alex</p>
                <p>
                    <b>The MemeTeam</b>
                </p>
            </div>
        </div>
    );
}

export default MemeTeam;