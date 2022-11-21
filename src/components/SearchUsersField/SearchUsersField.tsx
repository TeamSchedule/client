import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { BaseButton } from "../buttons";
import { API } from "../../api/api";

interface SearchUsersFieldProps {
    onSendInvites: (event: React.FormEvent) => void;
    usersToInvite: Array<number>;
    setUsersToInvite: (event: React.SetStateAction<number[]>) => void;
    isInviteActionInProgress: boolean;
}

export default function SearchUsersField(props: SearchUsersFieldProps) {
    const [username, setUsername] = useState("");
    const [foundUsers, setFoundUsers] = useState([]);

    useEffect(() => {
        if (username.length > 2) {
            API.users.filterByUsername(username).then((users) => {
                setFoundUsers(users);
            });
        }
    }, [username]);

    return (
        <>
            <div>
                <div className="my-4">
                    <Autocomplete
                        multiple
                        limitTags={2}
                        id="multiple-limit-tags"
                        options={foundUsers}
                        // @ts-ignore
                        getOptionLabel={(option) => option.login}
                        // @ts-ignore
                        onChange={(e, v) => props.setUsersToInvite(v)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Имя пользователя"
                                placeholder="Имя пользователя"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        )}
                    />

                    <BaseButton
                        text="Пригласить"
                        className="mt-3"
                        onClick={props.onSendInvites}
                        disabled={!props.usersToInvite || +props.usersToInvite.length === 0}
                        loading={props.isInviteActionInProgress}
                        color="common"
                    />
                </div>
            </div>
        </>
    );
}
