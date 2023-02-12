import { Checkbox, ListSubheader, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { UnitResponseItemSchema } from "../../../api/schemas/responses/units";
import { UserSchema } from "../../../api/schemas/responses/users";
import styles from "../FilterItem.module.scss";

interface FilterUserProps {
    units: UnitResponseItemSchema[];
    selectedValues: UserSchema[];
    onChange: (value: UserSchema[]) => void;
}

export default function FilterUser(props: FilterUserProps) {
    function onChangeSelectedUsers(unit: SelectChangeEvent<UserSchema[]>) {
        const val = unit.target.value;
        if (typeof val !== "string") {
            props.onChange(val);
        }
    }

    const items = [];
    for (let unit of props.units) {
        items.push(<ListSubheader key={unit.id}>{unit.name}</ListSubheader>);
        for (let user of unit.members) {
            items.push(
                <MenuItem key={user.id} value={user as any}>
                    <Checkbox checked={props.selectedValues.indexOf(user) > -1} />
                    {user.fullName}
                </MenuItem>
            );
        }
    }

    return (
        <>
            <Select
                className={styles.filter}
                id="user-grouped-select"
                placeholder="Сотрудники"
                fullWidth
                multiple
                displayEmpty
                // @ts-ignore
                renderValue={() => <span>Сотрудники</span>}
                value={props.selectedValues}
                onChange={onChangeSelectedUsers}
            >
                {items}
            </Select>
        </>
    );
}
