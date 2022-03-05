import React from "react";
import Button from "@mui/material/Button";
import CloseFormIcon from "../../../../generic/CloseFormIcon";
import InputColor from 'react-input-color';


export function TeamNameItem(props) {
    return (
        <div className="d-flex flex-column mt-3">
            <label htmlFor="teamName">Team's name</label>
            <input className="py-1 mt-1 w-100" type="text" id="teamName" name="teamName"
                   value={props.value}
                   onChange={e => props.setValue(e.target.value)} />
        </div>
    );
}


export function TeamDescriptionItem(props) {
    return (
        <div className="d-flex flex-column mt-3">
            <label htmlFor="teamDescription">Team's description</label>
            <input className="py-1 mt-1 w-100" type="text" id="teamDescription" name="teamDescription"
                   value={props.value}
                   onChange={e => props.setValue(e.target.value)} />
        </div>
    );
}


export function TeamSubmitButton(props) {
    return (
        <Button variant="contained" color="success" className="my-2 w-100 mt-4" type="submit"
                onClick={props.onClick} disabled={props.disabled}>
            {props.btnText}
        </Button>
    );
}


export function CloseTeamFormIcon() {
    return (
        <div className="d-flex justify-content-between">
            <p className="fw-bold">Create new team</p>
            <CloseFormIcon />
        </div>
    );
}


export function TeamColorInput(props) {
    return (
        <>
            <div className="my-2 d-flex">
                <p className="mr-3">Change color for team's task</p>
                <InputColor
                    initialValue="#5e72e4"
                    onChange={props.setValue}
                    value={props.value}
                    placement="right"
                />
            </div>
        </>
    );
}
