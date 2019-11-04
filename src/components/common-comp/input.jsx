import React from "react";

const Input = ({ name, label, value, type, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        onChange={onChange}
        value={value}
        id={name}
        type={type}
        className="form-control"
      />
    </div>
  );
};

export default Input;
