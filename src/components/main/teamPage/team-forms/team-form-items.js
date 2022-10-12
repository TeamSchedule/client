import React from "react";
import InputColor from "react-input-color";

export function TeamColorInput({ value, setValue, initialColor }) {
    return (
        <>
            <div className="my-2 d-flex">
                <p className="mr-3">Сменить цвет для задач этой команды</p>
                <InputColor
                    initialValue={initialColor}
                    onChange={setValue}
                    value={value}
                    placement="right"
                />
            </div>
        </>
    );
}
