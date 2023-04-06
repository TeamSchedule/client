import { Autocomplete, TextField } from "@mui/material";
import styles from "../UserSelector/UserSelector.module.scss";
import UserPreview from "../../users/UsersPreview/UserPreview";
import { UserSchema } from "../../../api/schemas/responses/users";
import useApiCall from "../../../hooks/useApiCall";
import { API } from "../../../api/api";
import Box from "@mui/material/Box";

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
    const getUsersApiCall = useApiCall<UserSchema[]>(() => API.users.all(), [], [], Boolean(props.users));

    return (
        <>
            <div>
                <Autocomplete
                    id="users-selector"
                    disabled={props.disabled}
                    multiple
                    options={
                        props.users
                            ? props.users.length === 0
                                ? getUsersApiCall.data
                                : props.users
                            : getUsersApiCall.data
                    }
                    disableCloseOnSelect
                    fullWidth
                    freeSolo={true}
                    // @ts-ignore
                    getOptionLabel={(option: UserSchema) =>
                        [option.lastName, option.firstName, option.patronymic].join(" ")
                    }
                    renderOption={(props, option, { selected }) => (
                        <Box
                            component="li"
                            {...props}
                            key={option.id}
                            className={styles.selectorItem}
                            sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                            <input type="checkbox" checked={selected} className="mx-3 cursor-pointer" />
                            <UserPreview user={option} />
                        </Box>
                    )}
                    value={props.inputValue}
                    onChange={(e, value) => {
                        props.setInputValue(value as any);
                    }}
                    renderInput={(params) => {
                        return <TextField required {...params} label={props.label} placeholder={props.placeholder} />;
                    }}
                    className={props.className}
                />
            </div>
        </>
    );
}
