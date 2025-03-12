import {
  IconAdjustments,
  IconCalendarStats,
  IconFileAnalytics,
  IconGauge,
  IconLock,
  IconNotes,
  IconPresentationAnalytics,
} from '@tabler/icons-react';
import { Code, Group, ScrollArea } from '@mantine/core';
import { LinksGroup } from '../NavbarLinksGroup/NavbarLinksGroup';
import { UserButton } from '../UserButton/UserButton';
import { Logo } from './Logo';
import classes from './NavbarNested.module.css';
import { link } from 'fs';

const mockdata = [
  { label: 'Home', icon: IconGauge, link: '/' },
  {
    label: 'All Businesses',
    icon: IconNotes,
    link: '/AllBusiness',
  },
  { label: 'Elijah', icon: IconPresentationAnalytics, link: '/ElijahTest'  },
  { label: 'Zoo', icon: IconFileAnalytics, link: '/Zoo1'  },
  { 
    label: 'Settings', 
    icon: IconAdjustments, 
    initiallyOpened: true, 
    link: '/',
    sublinks: [
      { label: 'Overview', link: '/' },
      { label: 'Forecasts', link: '/' },
      { label: 'Outlook', link: '/' },
      { label: 'Real time', link: '/' },
    ], 
  },
];

export function NavbarNested() {
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <Logo style={{ width: 120 }} />
          <Code fw={700}>v3.1.2</Code>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton />
      </div>
    </nav>
  );
}