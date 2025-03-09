import { Burger, Drawer } from '@mantine/core';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';
import { NavbarSegmented } from '@/components/Navigation/NavbarSegmented/NavbarSegmented';
import { NavbarNested } from '@/components/Navigation/NavbarNested/NavbarNested';

export function HomePage() {
  
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
      {/* <TextField /> */}
      {/* <SelectField /> */}
      {/* <FloatingLabelInput /> */}


    </>
  );
}
