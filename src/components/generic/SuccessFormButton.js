import React from "react";
import Button from "@mui/material/Button";

function SuccessFormButton({btnText, onClick=null, disabled=false, className = ""}) {
    /*
    * Кнопка для успешного выполнения: "добавить", "создать", "сохранить" ...
    * */
    return (
        <>
            <Button
                variant="contained"
                color="success"
                className="my-2 w-100 mt-4"
                type="submit"
                onClick={onClick}
                disabled={disabled}
            >
                {btnText}
            </Button>
        </>
    );
}

export default SuccessFormButton;
