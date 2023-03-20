import { Autocomplete, TextField } from "@mui/material";
import styles from "../UserSelector/UserSelector.module.scss";
import UserPreview from "../../users/UsersPreview/UserPreview";
import { UserSchema } from "../../../api/schemas/responses/users";
import useUsers from "../../../hooks/useUsers";

interface UsersSelectorProps {
    setInputValue: (users: UserSchema[]) => void;
    inputValue: UserSchema[];
    users?: UserSchema[];
    className?: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
}

export default function UsersSelector(props: UsersSelectorProps) {
    const { users } = useUsers();

    return (
        <>
            <div>
                <Autocomplete
                    id="users-selector"
                    disabled={props.disabled}
                    multiple
                    options={props.users ? (props.users.length === 0 ? users : props.users) : users}
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
                    value={props.inputValue}
                    onChange={(e, value) => {
                        props.setInputValue(value as any);
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
