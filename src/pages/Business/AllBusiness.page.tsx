import { Table } from '@mantine/core';
import { Welcome } from '../../components/Welcome/Welcome';
import TableScrollArea, { TableProps } from '@/components/TableScrollArea/TableScrollArea';
import { useFetch } from '@mantine/hooks';
import { BusinessInfo } from '@/types/Reservation/Reservation';
import { getAllBusinessesUrl } from '@/functions/fetchEntities';
import { useNavigate } from 'react-router-dom';

export function AllBusinessPage() {

  const navigate = useNavigate();

  const { data, loading, error, refetch, abort } = useFetch<BusinessInfo[]>(getAllBusinessesUrl);

  const editBusiness = (id: string) => {
    navigate(`/Business/${id}`, { replace: true })
  }

  const headerValues = [
    'Name',
    'Reservations',
    'Max Capacity',
    'Start Time',
    'End Time'
  ]

  const headers = headerValues.map((header) => (
    <>
    <Table.Th>{header}</Table.Th>
    </>
  ));

  const rows = data?.map((row) => (
    <Table.Tr key={row.businessName} onClick={() => editBusiness(row.id)}>
      <Table.Td>{row.businessName}</Table.Td>
      <Table.Td>{row.reservations.length}</Table.Td>
      <Table.Td>{row.maxCapacity}</Table.Td>
      <Table.Td>{row.startTime}</Table.Td>
      <Table.Td>{row.endTime}</Table.Td>
    </Table.Tr>
  ));

  const tableProps: TableProps = {
    headers: headers,
    rows: rows
  };
  
  return (
    <>
      <Welcome />

      <TableScrollArea {...tableProps} />

    </>
  );
}
