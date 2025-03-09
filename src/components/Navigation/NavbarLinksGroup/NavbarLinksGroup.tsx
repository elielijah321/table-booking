import { useState } from 'react';
import { IconChevronRight } from '@tabler/icons-react';
import { Box, Collapse, Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import classes from './NavbarLinksGroup.module.css';

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  link: string;
  sublinks?: { label: string; link: string }[];
}

const handleLinkClick = (link: any) => {
    var a = document.createElement('a');
    a.setAttribute('href',link);
    a.click();
};


export function LinksGroup({ icon: Icon, label, initiallyOpened, link, sublinks }: LinksGroupProps) {
  const hasLinks = Array.isArray(sublinks);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? sublinks : []).map((sublink) => (
    <Text<'a'>
      component="a"
      className={classes.link}
      href={sublink.link}
      key={sublink.label}
    //   onClick={(event) => event.preventDefault()}
    >
      {sublink.label}
    </Text>
  ));

  return (
    <>
      <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
        <Group justify="space-between" gap={0}>
          <Box onClick={event => handleLinkClick(link)} style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon size={18} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              size={16}
              style={{ transform: opened ? 'rotate(-90deg)' : 'none' }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}