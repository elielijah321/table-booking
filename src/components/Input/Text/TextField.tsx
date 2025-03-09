import { TextInput } from '@mantine/core';
import classes from './Text.module.css';

export function TextField() {
  return (
    <>
      <TextInput label="Shipping address" placeholder="15329 Huston 21st" classNames={classes}  />
    </>
  );
}
