import React from "react";


export function TaskNameInput(props) {
    return (
        <div className="d-flex flex-column my-1">
            <label className={props.labelClassName} htmlFor={props.labelHtmlFor}>
                Название
            </label>
            <input className="py-1 my-1" type="text"
                   value={props.value}
                   onChange={e => props.setValue(e.target.value)} />
        </div>
    );
}


export function TaskDescriptionInput(props) {
    return (
        <div className="my-2">
            <label className={props.labelClassName} htmlFor={props.labelHtmlFor}>
                Описание
            </label>
            <textarea className="col" cols="30" rows="3"
                      value={props.value}
                      onChange={e => props.setValue(e.target.value)} />
        </div>
    );
}


export function TaskDatetimeInput(props) {
    return (
        <div className="my-2">
            <label className={props.labelClassName} htmlFor={props.labelHtmlFor}>
                Дата и время
            </label>
            <input className="py-1 my-1"
                // min={props.min}
                   type="datetime-local"
                   value={props.value}
                   onChange={e => props.setValue(e.target.value)} />
        </div>
    );
}


export function SubmitFormButton(props) {
    return (
        <input type="submit" className={"my-2 py-2 w-100 submit-button " + props.className} value={props.buttonText} />
    );
}

