import { Table } from '@mantine/core';
import TableScrollArea, { TableProps } from '@/components/TableScrollArea/TableScrollArea';
import { useFetch } from '@mantine/hooks';
import { BusinessInfo } from '@/types/Reservation/Reservation';
import { getBusinessInfoUrl } from '@/functions/fetchEntities';
import { useNavigate } from 'react-router-dom';
import { getDisplayDateAndTime } from '@/helpers/DateHelper';


export function Reservations() {

  const navigate = useNavigate();

  const { data, loading, error, refetch, abort } = useFetch<BusinessInfo>(getBusinessInfoUrl('ElijahTest'));

  console.log(data);


  const editBusiness = (id: string) => {
    navigate(`/Business/${id}`, { replace: true })
  }

  const headerValues = [
    'Name',
    'Party Size',
    'Phone Number',
    'Reservation Date',
  ]

  const headers = headerValues.map((header) => (
    <>
    <Table.Th>{header}</Table.Th>
    </>
  ));

  const rows = data?.reservations.map((row) => (
    <Table.Tr key={row.id} onClick={() => editBusiness(row.id)}>
      <Table.Td>{row.firstName} {row.lastName}</Table.Td>
      <Table.Td>{row.partySize}</Table.Td>
      <Table.Td>{row.phoneNumber}</Table.Td>
      <Table.Td>{getDisplayDateAndTime(row.reservationDate)}</Table.Td>
    </Table.Tr>
  ));

  const tableProps: TableProps = {
    headers: headers,
    rows: rows
  };
  
  return (
    <>
      <TableScrollArea {...tableProps} />
    </>
  );
}
