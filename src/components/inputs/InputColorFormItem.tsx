import React, { Dispatch, SetStateAction } from "react";

interface InputColorFormItemProps {
    setColor: Dispatch<SetStateAction<string>>;
    color: string;
}

export default function InputColorFormItem({ setColor, color }: InputColorFormItemProps) {
    return (
        <>
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </>
    );
}
