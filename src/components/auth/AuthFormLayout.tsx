import React from "react";
import styles from "./Auth.module.scss";

interface AuthFormLayoutProps {
    children: React.ReactElement;
    onSubmit: React.FormEventHandler;
    autocomplete?: string;
}

export default function AuthFormLayout(props: AuthFormLayoutProps) {
    return (
        <form
            className={[
                styles.authForm,
                "col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-3 p-1 p-sm-2 p-md-3 p-xl-4 mx-auto mt-0 mt-md-2",
            ].join(" ")}
            onSubmit={props.onSubmit}
        >
            {props.children}
        </form>
    );
}
