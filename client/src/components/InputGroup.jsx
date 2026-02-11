// src/components/Common/InputGroup.jsx
import React from 'react';

const InputGroup = ({ label, type = "text", name, value, onChange, placeholder, required = false }) => {
  return (
    <div className="mb-3">
      <label className="form-label fw-bold" style={{ fontSize: '0.9rem' }}>{label}</label>
      <input
        type={type}
        className="form-control"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default InputGroup;