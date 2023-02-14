import { Checkbox, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { UnitResponseItemSchema } from "../../../api/schemas/responses/units";
import styles from "../FilterItem.module.scss";
import Typography from "@mui/material/Typography";
import { FilterBadge } from "../common";

interface FilterUnitProps {
    units: UnitResponseItemSchema[];
    selectedValues: UnitResponseItemSchema[];
    onChange: (value: UnitResponseItemSchema[]) => void;
}

export default function FilterUnit(props: FilterUnitProps) {
    function onChangeSelectedUnit(event: SelectChangeEvent<UnitResponseItemSchema[]>) {
        const val = event.target.value;
        if (typeof val !== "string") {
            props.onChange(val);
        }
    }

    return (
        <>
            <Select
                className={styles.filter}
                id="unit-select"
                placeholder="Отделы"
                multiple
                fullWidth
                displayEmpty
                // @ts-ignore
                renderValue={() => (
                    <FilterBadge badgeContent={props.selectedValues.length} color="primary">
                        <Typography>Отделы</Typography>
                    </FilterBadge>
                )}
                value={props.selectedValues}
                onChange={onChangeSelectedUnit}
            >
                {props.units.map((unit) => (
                    <MenuItem key={unit.id} value={unit as any}>
                        <Checkbox checked={props.selectedValues.indexOf(unit) > -1} />
                        <Typography>{unit.name}</Typography>
                    </MenuItem>
                ))}
            </Select>
        </>
    );
}
