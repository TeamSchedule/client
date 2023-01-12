import { Autocomplete, Box, TextField } from "@mui/material";

interface UnitSelectorProps {
    units: Array<UnitSelectorItem>;
}

export default function UnitSelector(props: UnitSelectorProps) {
    return (
        <>
            <div>
                <Autocomplete
                    id="unit-selector"
                    fullWidth
                    options={props.units}
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    renderOption={(props, option) => (
                        <Box component="li" {...props}>
                            {option.label}
                        </Box>
                    )}
                    onChange={(e, value) => {
                        console.log(value);
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
            </div>
        </>
    );
}

interface UnitSelectorItem {
    label: string;
    id: number;
}
