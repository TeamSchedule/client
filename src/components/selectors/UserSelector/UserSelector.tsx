import { Autocomplete, TextField } from "@mui/material";
import UserPreview from "../../users/UsersPreview/UserPreview";
import styles from "./UserSelector.module.scss";
import { UserSchema } from "../../../api/schemas/responses/users";
import useApiCall from "../../../hooks/useApiCall";
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
    const getUsersApiCall = useApiCall<UserSchema[]>(() => API.users.all(), []);

    return (
        <>
            <div>
                <Autocomplete
                    id="user-selector"
                    disabled={props.disabled}
                    options={
                        props.users
                            ? props.users.length === 0
                                ? getUsersApiCall.data
                                : props.users
                            : getUsersApiCall.data
                    }
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
