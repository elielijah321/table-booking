import { NumberInput } from '@mantine/core';
import classes from './Number.module.css';

export function NumberField() {
  return (
    <>
      <NumberInput label="Shipping address" placeholder="15329 Huston 21st" classNames={classes}  />
    </>
  );
}
