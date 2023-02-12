import { Checkbox, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { UnitResponseItemSchema } from "../../../api/schemas/responses/units";
import styles from "../FilterItem.module.scss";

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
                renderValue={() => <span>Отделы</span>}
                value={props.selectedValues}
                onChange={onChangeSelectedUnit}
            >
                {props.units.map((unit) => (
                    <MenuItem key={unit.id} value={unit as any}>
                        <Checkbox checked={props.selectedValues.indexOf(unit) > -1} />
                        {unit.name + " " + unit.id.toString()}
                    </MenuItem>
                ))}
            </Select>
        </>
    );
}
