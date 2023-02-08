import React from "react";
import { MenuItem, Select } from "@mui/material";

interface PlainSelectorProps {
    id?: string;
    filterValue: any;
    setFilterValue: (value: number) => void;
    filterObj: Array<[string, string]>;
}

export default function PlainSelector(props: PlainSelectorProps) {
    return (
        <>
            <Select
                id={props.id || "filter"}
                value={props.filterValue}
                onChange={(e) => {
                    props.setFilterValue(e.target.value as number);
                }}
            >
                {props.filterObj.map((menuItem) => (
                    <MenuItem key={menuItem[0]} value={menuItem[0]}>
                        {menuItem[1]}
                    </MenuItem>
                ))}
            </Select>
        </>
    );
}
