import React from "react";

import "./Input.css";

export default function Input({ name, label, error, modifier, ...rest }) {
  return (
    <>
      <div className={`input`}>
        <label
          className={`input__label`}
          htmlFor={name}
        >
          {label}
        </label>
        <input
          className={`input__field`}
          id={name}
          name={name}
          {...rest}
        />
      </div>
      <span className={`input__error`}>
        {error}
      </span>
    </>
  );
}
