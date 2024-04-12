import React from 'react';
import Switch from 'react-switch';
import './switch.css'
const ToggleSwitch = ({ label, onChange, checked }) => {
  return (
    <div className="toggle-switch">
      <label>{label}</label>
      <Switch checked={checked} onChange={onChange} />
    </div>
  );
};

export default ToggleSwitch;