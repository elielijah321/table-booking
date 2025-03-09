import { Table } from '@mantine/core';
import TableScrollArea, { TableProps } from '@/components/TableScrollArea/TableScrollArea';
import classes from './TimeSlotPicker.module.css';

export interface TimeSlotPickerProps {
  timeSlots: string[] | undefined;
  disabledSlots: string[];
  onTimeSelect: (time: string | null) => void;
  highlightedSlot: string | null;
}

export const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  timeSlots,
  disabledSlots,
  onTimeSelect,
  highlightedSlot
}) => {

  const rows = timeSlots?.map((row) => (
    <Table.Tr className={`${classes.center} ${highlightedSlot === row ? classes.selected : ""}`} key={row} onClick={() => onTimeSelect(row)}>
      <Table.Td className={classes.rowstyle}><span>{row}</span></Table.Td>
    </Table.Tr>
  ));

  const tableProps: TableProps = {
    headers: [],
    rows: rows
  };
  
  return (
    <>
      <TableScrollArea {...tableProps} />
    </>
  );
}
