import React from 'react';
import "./button.css";


export default function Button(props) {
    return (
        <button
            type="button"
            className={"btn btn-light btn-primary myBtn col-auto my-1" + props.className}
            onClick={props.onClick}>
            {props.title}
        </button>
    );
}
