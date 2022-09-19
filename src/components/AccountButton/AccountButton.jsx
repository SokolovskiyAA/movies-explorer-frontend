import React from "react";

import "./AccountButton.css";
import Button from "../Button/Button";

const AccounrButton = ({
    children,
    className,
    type = "button",
    handler,
    isFormValid = true,
    isLoading,
}) => {
    return (
        <Button className="button_type_account">
            <p className="button__text_type_account">Аккаунт</p>
            <div className="button__icon-account">
            </div>
        </Button>
    );
};

export default AccounrButton;
