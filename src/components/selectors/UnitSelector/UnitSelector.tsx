import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { UnitResponseItemSchema } from "../../../api/schemas/responses/units";
import { API } from "../../../api/api";
import { unitsData } from "../../../testdata/data";

interface UnitSelectorProps {
    setInputValue: (unit: UnitResponseItemSchema) => void;
    inputValue: UnitResponseItemSchema | null;
    disabled?: boolean;
}

export default function UnitSelector(props: UnitSelectorProps) {
    const [units, setUnits] = useState<UnitResponseItemSchema[]>(unitsData);

    useEffect(() => {
        API.units
            .all()
            .then((units: UnitResponseItemSchema[]) => {
                setUnits(units);
            })
            .catch(() => {});
    }, []);

    return (
        <>
            <Autocomplete
                id="unit-selector"
                disabled={props.disabled}
                autoHighlight
                fullWidth
                options={units}
                renderOption={(props, option) => {
                    return (
                        <li {...props} key={option.id}>
                            {option.name}
                        </li>
                    );
                }}
                getOptionLabel={(option: UnitResponseItemSchema) => option.name}
                value={props.inputValue}
                onChange={(e, value) => {
                    props.setInputValue(value as any);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Выберите отдел"
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-unit", // disable autocomplete and autofill
                        }}
                    />
                )}
            />
        </>
    );
}
