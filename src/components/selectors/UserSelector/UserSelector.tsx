import { Autocomplete, TextField } from "@mui/material";
import UserPreview from "../../users/UsersPreview/UserPreview";
import styles from "./UserSelector.module.scss";
import { useEffect, useState } from "react";
import { UserSchema } from "../../../api/schemas/responses/users";
import { usersData } from "../../../testdata/data";
import { API } from "../../../api/api";

interface UserSelectorProps {
    setInputValue: (users: UserSchema | null) => void;
    inputValue: UserSchema | null;
    users?: UserSchema[];
    className?: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
}

export default function UserSelector(props: UserSelectorProps) {
    const [users, setUsers] = useState<UserSchema[]>([]);

    useEffect(() => {
        if (props.users) {
            setUsers(props.users);
            return;
        }
        API.users
            .all()
            .then((users: UserSchema[]) => {
                setUsers(users);
            })
            .catch(() => {})
            .finally(() => {});
    }, []);

    return (
        <>
            <div>
                <Autocomplete
                    id="user-selector"
                    disabled={props.disabled}
                    options={users}
                    fullWidth
                    freeSolo={true}
                    // @ts-ignore
                    getOptionLabel={(option) => option.fullName}
                    renderOption={(props, option, { selected }) => (
                        <li {...props} key={option.id} className={styles.selectorItem}>
                            <input type="checkbox" checked={selected} className="mx-3" />
                            <UserPreview user={option} />
                        </li>
                    )}
                    value={props.inputValue}
                    onChange={(e, value) => {
                        props.setInputValue(value as any);
                    }}
                    renderInput={(params) => (
                        <TextField required {...params} label={props.label} placeholder={props.placeholder} />
                    )}
                    className={props.className}
                />
            </div>
        </>
    );
}
