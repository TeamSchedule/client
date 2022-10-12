import React from "react";
import CloseFormIcon from "./CloseFormIcon";

export default function FormHeaderRow({ headerText }) {
    return (
        <>
            <div className="d-flex justify-content-between">
                <p className="fw-bold">{headerText}</p>
                <CloseFormIcon />
            </div>
        </>
    );
}
