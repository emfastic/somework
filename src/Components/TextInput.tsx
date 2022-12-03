import React, { useState, useImperativeHandle } from "react";
import "../sass/profile.scss";

interface RefType {
  value?: string;
  getValue: Function;
}

interface PropsType {
  className: string;
  label: string;
  type?: string;
  min?: string;
}

const TextInput = React.forwardRef<RefType, PropsType>((props, ref) => {
  const [value, setValue] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  // used to pass value upwards to parent
  useImperativeHandle(ref, () => ({
    getValue: (): string => {
      return value;
    },
  }));

  return (
    <span className={props.className}>
      <input
        className={props.className}
        value={value}
        type={props.type}
        min={props.type === "month" ? "1940-01" : ""}
        onChange={handleChange}
      />
      <label className={props.type === "month" ? "month" : value && "filled"}>
        {props.label}
      </label>
    </span>
  );
});

export default TextInput;
