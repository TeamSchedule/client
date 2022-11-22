import React, { SetStateAction, useState } from "react";
import styles from "./TextInputInPlace.module.scss";
import EditIcon from "../../svg/EditIcon";

export interface TextInputInPlaceProps {
    value: string;
    handleChange: SetStateAction<any>;
    className?: string;
}

export default function TextInputInPlace(props: TextInputInPlaceProps) {
    const [isEditMode, setIsEditMode] = useState(false);

    return (
        <>
            <div className="d-flex">
                {!isEditMode && (
                    <p
                        onClick={() => {
                            setIsEditMode(true);
                        }}
                        className={styles.text}
                    >
                        {props.value}
                    </p>
                )}

                {isEditMode && (
                    <input
                        type="text"
                        value={props.value}
                        onChange={(e) => props.handleChange(e.target.value)}
                        className={styles.textInput}
                    />
                )}
                <EditIcon size={20} className={styles.editIcon} />
            </div>
        </>
    );
}
