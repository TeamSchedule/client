import { Autocomplete, TextField } from "@mui/material";
import { UnitResponseItemSchema } from "../../../api/schemas/responses/units";
import useApiCall from "../../../hooks/useApiCall";
import { API } from "../../../api/api";

interface UnitSelectorProps {
    setInputValue: (unit: UnitResponseItemSchema) => void;
    inputValue: UnitResponseItemSchema | null;
    disabled?: boolean;
}

export default function UnitSelector(props: UnitSelectorProps) {
    const getUnitsApiCall = useApiCall<UnitResponseItemSchema[]>(() => API.units.all(), []);

    return (
        <>
            <Autocomplete
                size="small"
                id="unit-selector"
                disabled={props.disabled}
                autoHighlight
                fullWidth
                options={getUnitsApiCall.data}
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
