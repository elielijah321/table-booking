import { JSX, useState } from 'react';
import cx from 'clsx';
import { ScrollArea, Table } from '@mantine/core';
import classes from './TableScrollArea.module.css';

export interface TableProps {
  headers: JSX.Element[];
  rows: JSX.Element[] | undefined; // Optional selected date
}

const TableScrollArea: React.FC<TableProps> = ({ headers, rows }) => {
  const [scrolled, setScrolled] = useState(false);

  return (
    <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table>
        <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
        {headers}
        </Table.Thead>  
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}

export default TableScrollArea;