import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import './App.css';

import { Burger, Drawer, MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { useDisclosure } from '@mantine/hooks';
import { NavbarNested } from './components/Navigation/NavbarNested/NavbarNested';


export default function App() {

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
    <MantineProvider theme={theme}>

      <div className='burger-menu'>
        <Burger opened={opened} onClick={open} aria-label="Toggle navigation" />
      </div>

      <Drawer opened={opened} onClose={close} withCloseButton={false}>
        <NavbarNested />
      </Drawer>

      <Router />
    </MantineProvider>
    </>
  );
}
