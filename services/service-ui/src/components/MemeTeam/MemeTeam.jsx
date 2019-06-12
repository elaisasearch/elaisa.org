import React from "react";
import memeteam from "../../assets/img/memeteam.png";
import "../../assets/css/MemeTeamStyle.css";

/**
 * A Fun picture component if the user searches for 'memeteam'.
 * @returns {JSX} the memeteam group picture as polaroid.
*/
const MemeTeam = () => {
    return (
        <div className="polaroid">
            <a
                href="https://github.com/dasmemeteam/language-level-search-engine"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src={memeteam} alt="MemeTeam" className="polaroidImage" />
            </a>
            <div className="polaroidText">
                <p>Jenny, Paula, Alex</p>
                <p>
                    <b>The MemeTeam</b>
                </p>
            </div>
        </div>
    );
}

export default MemeTeam;