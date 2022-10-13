import React from "react";
import InputColor from "react-input-color";

export default function InputColorFormItem({ value, setValue, initialColor, placement = "right" }) {
    return (
        <InputColor
            initialValue={initialColor}
            onChange={setValue}
            value={value}
            placement={placement}
        />
    );
}
