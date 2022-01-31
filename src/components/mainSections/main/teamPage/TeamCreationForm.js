import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import UserItem from "./UserItem";
import userIcon from "../../header/userIcon.png";
import "./teamPage.css";
import {API} from "../../../../api-server/api";
import {useSelector} from "react-redux";
import {selectUserInfo} from "../../../../features/userInfoSlice";
import {TeamNameItem, TeamSubmitButton} from "./team-form-items";

export const ADD = "ADD";
export const REMOVE = "REMOVE";


function TeamCreationForm() {
    const userInfo = useSelector(selectUserInfo);

    const [/*liveSearchResultsVisibility*/, setLiveSearchResultsVisibility] = useState(false);
    const [foundUsers, setFoundUsers] = useState(new Set([]));
    const [addedUsers, setAddedUsers] = useState(new Set([]));

    const [teamName, setTeamName] = useState("");
    const [username, setUsername] = useState("");


    function createTeamSbm(e) {
        e.preventDefault();

        let usersInTeam = Array.from(addedUsers).map(addedUser => addedUser.username);
        usersInTeam.push(userInfo.username);
        let data = {
            "name": teamName,
            "membersLogins": usersInTeam,
        };

        API.teams.createTeam(data).then(data => {
            alert("team created");
        });
    }

    useEffect(() => {
        if (username.length > 2) {
            let params = {
                "username": username,
            };

            API.users.filterByUsername(params).then(res => {
                setFoundUsers(new Set(Array.from(res.data).filter(team => team.username !== userInfo.username)));
                setLiveSearchResultsVisibility(true);
            });
        } else {
            setFoundUsers(new Set([]));
            setLiveSearchResultsVisibility(false);
        }
    }, [username]);

    const addedV = Array.from(addedUsers).filter(team => team.name !== userInfo.username).map(userData => <UserItem
        data={userData}
        action={REMOVE}
        key={userData.id}
        addedUsers={addedUsers}
        setAddedUsers={setAddedUsers}
        foundUsers={foundUsers}
        setFoundUsers={setFoundUsers}
    />);

    let foundV = Array.from(foundUsers).map(userData => <UserItem data={userData}
                                                                  action={ADD}
                                                                  key={userData.id}
                                                                  addedUsers={addedUsers}
                                                                  setAddedUsers={setAddedUsers}
                                                                  foundUsers={foundUsers}
                                                                  setFoundUsers={setFoundUsers}
    />);

    return (
        <div className="w-100">
            <form className="p-3 teamCreationForm" onSubmit={createTeamSbm} autoComplete="off">
                <div className="position-relative">
                    <p className="text-center fw-bold">Create new team</p>
                    <Link to="../">
                        <button type="button"
                                className="close closeIcon"
                                aria-label="Close">
                            <span aria-hidden="true" className="closeIcon mx-1">&times;</span>
                        </button>
                    </Link>
                </div>

                <div>
                    <TeamNameItem value={teamName} setValue={setTeamName} />

                    <div className="d-flex flex-column mt-3">
                        <div>
                            <p>Members:</p>

                            <div className="p-1 d-flex align-items-center teamCreator">
                                <img className="foundUserIcon" src={userIcon}
                                     alt="userIcon" />
                                <span className="mx-2">{userInfo.username}</span>
                                <span>(creator)</span>
                            </div>
                            {addedV}


                            <div className="d-flex mt-1 flex-column">
                                <input className="py-1 searchUserInput"
                                       type="text"
                                       id="username"
                                       name="username"
                                       onChange={e => setUsername(e.target.value)}
                                       value={username.toString()}
                                       onBlur={() => {
                                           setLiveSearchResultsVisibility(false)
                                       }}
                                />
                            </div>

                            {foundV}
                        </div>
                    </div>


                    <input type="submit" id="createTeamSubmit" className="mt-4 py-1 w-100 submit-button"
                           value="Create team" />

                    <TeamSubmitButton btnText="Create team" />
                </div>
            </form>
        </div>
    );
}

export default TeamCreationForm;
