import { Autocomplete, TextField } from "@mui/material";
import UserPreview from "../../users/UsersPreview/UserPreview";
import styles from "./UserSelector.module.scss";
import { Dispatch, SetStateAction } from "react";
import { UserSchema } from "../../../schemas/responses/users";

interface UserSelectorProps {
    users: Array<UserSchema>;
    className?: string;
    multiple?: boolean;
    handleChange: Dispatch<SetStateAction<UserSchema | null>> | Dispatch<SetStateAction<UserSchema[]>>;
    label?: string;
    placeholder?: string;
}

export default function UserSelector(props: UserSelectorProps) {
    return (
        <>
            <div>
                <Autocomplete
                    multiple={props.multiple}
                    id="user-selector"
                    options={props.users}
                    disableCloseOnSelect
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
                    onChange={(e, value) => {
                        console.log(value);
                        const defaultValue = props.multiple ? [] : null;
                        // @ts-ignore
                        props.handleChange(value || defaultValue);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label={props.label} placeholder={props.placeholder} />
                    )}
                    className={props.className}
                />
            </div>
        </>
    );
}
