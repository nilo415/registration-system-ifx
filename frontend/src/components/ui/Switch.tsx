import React from 'react';

export default function Switch(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="switch">
      <input type="checkbox" {...props} />
      <span className="slider"></span>
    </label>
  );
}
