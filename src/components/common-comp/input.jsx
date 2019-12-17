import React from "react";

const Input = ({ name, label, value, type, error, onChange }) => {
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
      
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
