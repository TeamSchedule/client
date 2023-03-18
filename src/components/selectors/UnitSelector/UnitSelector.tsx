import { Autocomplete, TextField } from "@mui/material";
import { UnitResponseItemSchema } from "../../../api/schemas/responses/units";
import useUnits from "../../../hooks/useUnits";

interface UnitSelectorProps {
    setInputValue: (unit: UnitResponseItemSchema) => void;
    inputValue: UnitResponseItemSchema | null;
    disabled?: boolean;
}

export default function UnitSelector(props: UnitSelectorProps) {
    const { units } = useUnits();

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
