import userIcon from "../../header/userIcon.png";
import React from "react";
import {ADD, REMOVE} from "./TeamCreationForm";


function UserItem(props) {
    let action = props.action;
    let actionIcon = null;
    if (action === REMOVE) {
        actionIcon = (
            <svg className="actionUserTeamIcon" viewBox="0 0 24 24">
                <path fill="currentColor"
                      d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M1,10V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z"/>
            </svg>
        );
    } else if (action === ADD) {
        actionIcon = (
            <svg className="actionUserTeamIcon" viewBox="0 0 24 24">
                <path fill="currentColor"
                      d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z"/>
            </svg>
        );
    }

    function clickUser(flagAction) {
        let users = new Set(props.addedUsers);
        if (flagAction === ADD) {
            users.add(props.data);
            props.setFoundUsers(new Set(props.foundUsers).delete(props.data));
        } else {
            users.delete(props.data);
        }
        props.setAddedUsers(users);
    }

    return (
        <div className="d-flex p-1 w-100 justify-content-between align-items-center foundUserItem"
             onClick={() => {
                 clickUser(action)
             }}>
            <div>
                <img className="foundUserIcon" src={userIcon}
                     alt="userIcon"/>
                <span className="mx-2 ">{props.data.username}</span>
            </div>
            {actionIcon}
        </div>
    );
}

export default UserItem;
