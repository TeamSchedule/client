import React from "react";
import Button from "@mui/material/Button";


export function TeamNameItem(props) {
    return (
        <div className="d-flex flex-column mt-3">
            <label htmlFor="username">Team's name</label>
            <input className="py-1 mt-1 w-100" type="text" id="teamName" name="teamName"
                   value={props.value}
                   onChange={e => props.setValue(e.target.value)} />
        </div>
    );
}


export function TeamSubmitButton(props) {
    return (
        <Button variant="contained" color="success" className="my-2 w-100" type="submit">
            {props.btnText}
        </Button>
    );
}
