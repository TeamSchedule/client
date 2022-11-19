import React from "react";
import { Link } from "react-router-dom";
import styles from "./Auth.module.scss";

export default function SuccessRegisteredMsg() {
    return (
        <form
            className={[
                styles.authForm,
                "col-sm-12 col-md-8 col-xl-6 col-xxl-6 p-1 p-sm-2 p-md-3 p-xl-4 mx-auto mt-0 mt-md-2",
            ].join(" ")}
        >
            <p className={styles.formHeader}>Завершение регистрации</p>
            <p className="fs-5">Поздравляем! Вы успешно зарегистрировались!</p>
            <div className="fs-5">
                <p>На Вашу почту было выслано письмо для активации аккаунта.</p>
                <p className="fw-bold">Перейдите по ссылке в этом письме.</p>
                <p>
                    После этого можно перейти на <Link to={"/login"}>страницу входа.</Link>
                </p>
            </div>
        </form>
    );
}
