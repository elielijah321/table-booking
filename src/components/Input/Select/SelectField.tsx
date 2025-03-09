import React from "react";
import { Select } from "@mantine/core";
import classes from './Select.module.css';

interface SelectFieldProps {
  data: string[];
  placeholder: string;
  label: string;
  inputProps?: object;
  keyProp?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({ data, placeholder, label, inputProps, keyProp }) => {
  return (
    <Select
      mt="md"
      comboboxProps={{ withinPortal: true }}
      data={data}
      placeholder={placeholder}
      label={label}
      classNames={classes}
      key={keyProp}
      {...inputProps}
    />
  );
};


export default SelectField;
