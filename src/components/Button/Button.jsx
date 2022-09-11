import React from "react";

import "./Button.css";

const Button = ({
  children,
  className,
  type = "button",
  handler,
  isFormValid = true,
  isLoading,
}) => {
  return (
    <button
      className={`${className} button`}
      type={type}
      onClick={handler}
      disabled={!isFormValid || isLoading}
    >
      {children}
    </button>
  );
};

export default Button;
