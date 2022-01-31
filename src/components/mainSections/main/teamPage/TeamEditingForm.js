import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import UserItem from "./UserItem";
import userIcon from "../../header/userIcon.png";
import {API} from "../../../../api-server/api";
import {useSelector} from "react-redux";
import {selectUserInfo} from "../../../../features/userInfoSlice";
import {selectEditedTeam} from "../../../../features/editedTeamSlice";
import {TeamNameItem, TeamSubmitButton} from "./team-form-items";
import "./teamPage.css";


export const ADD = "ADD";
export const REMOVE = "REMOVE";


const TeamEditingForm = () => {
    const userInfo = useSelector(selectUserInfo);
    const editedTeam = useSelector(selectEditedTeam);

    const [/*liveSearchResultsVisibility*/, setLiveSearchResultsVisibility] = useState(false);

    const [foundUsers, setFoundUsers] = useState(new Set([]));
    const [addedUsers, setAddedUsers] = useState(new Set([]));

    const [teamName, setTeamName] = useState(editedTeam.name);
    const [username, setUsername] = useState("");

    useEffect(() => {
        setAddedUsers(editedTeam.users.filter(user => user.login !== userInfo.username));
    }, []);


    function onTeamCreated(e) {
        e.preventDefault();

        let usersInTeam = Array.from(addedUsers).map(addedUser => addedUser.username);
        usersInTeam.push(userInfo.username);
        let data = {
            "id": editedTeam.id,
            "name": document.getElementById("teamName").value,
            "membersLogins": usersInTeam,
        };

        API.teams.editTeam(data).then(data => {
            alert("team edited");
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
        <div
            className="d-flex justify-content-center align-items-center w-100 teamCreationBackground">
            <form className="p-3 teamCreationForm" onSubmit={onTeamCreated} autoComplete="off">
                <div className="position-relative">
                    <p className="text-center fw-bold">Edit team</p>
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
                </div>
                <TeamSubmitButton btnText="Edit team" />
            </form>
        </div>
    );
}

export default TeamEditingForm;
