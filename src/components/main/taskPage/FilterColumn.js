import React, {useState} from 'react';


export function FilterColumn({teams, changeShowedTeams}) {
    return (
        <>
            <div className="p-3" style={{ minWidth: "200px", }}>
                <h4>Фильтры</h4>
                <h5>По командам:</h5>
                {
                    teams.map(
                        team =>
                            <FilterTeamItem
                                key={team.id}
                                teamName={team.name}
                                teamColor={team.color}
                                teamId={team.id}
                                onCLick={changeShowedTeams}
                            />
                    )
                }
            </div>
        </>
    );
}


function FilterTeamItem({teamId, teamName, teamColor, onCLick}) {
    const [isChecked, setIsChecked] = useState(true);

    function onChangeCheckedStatus() {
        setIsChecked(!isChecked);
        onCLick(teamId);
    }

    return (
        <>
            <div
                className="d-flex align-items-center align-content-center p-1 filterTeamItem"
                onClick={onChangeCheckedStatus}
            >
                <input type="checkbox" checked={isChecked} />
                <p className="m-0 mx-2 px-2 w-100 border-round text-white fs-6 fw-bolder"
                   style={{
                       backgroundColor: teamColor,
                   }}
                >
                    {teamName}
                </p>
            </div>
        </>
    );
}
