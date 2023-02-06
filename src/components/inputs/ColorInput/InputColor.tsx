import React from "react";

interface InputColorFormItemProps {
    setColor: (value: string) => void;
    color: string | undefined;
    className?: string;
}

export default function InputColor(props: InputColorFormItemProps) {
    return (
        <>
            <input
                type="color"
                value={props.color}
                onChange={(e) => props.setColor(e.target.value)}
                className={props.className}
            />
        </>
    );
}
