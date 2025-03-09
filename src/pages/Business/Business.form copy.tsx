import { NumberField } from '@/components/Input/Number/NumberField';
import SelectField from '@/components/Input/Select/SelectField';
import { getAllBusinessesUrl, getBusinessInfoUrl, postBusiness } from '@/functions/fetchEntities';
import { BusinessInfo } from '@/types/Reservation/Reservation';
import { TextInput, Box, Group, Button, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { randomId, useFetch } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// export interface BusinessInfo {
//   name: string;
//   email: string;
//   address: string;
//   price: number;
//   employees: { name: string; active: boolean; key: string }[];
// }


const initialValues: BusinessInfo = {
  id: '00000000-0000-0000-0000-000000000000',
  businessName: '',
  businessType: '',
  email: '',
  address: '',
  phoneNumber: '',
  defaultOfferingName: '',
  defaultOfferingPrice: 1,
  businessOfferings: [],
  maxCapacity: 10,
  startTime: '',
  endTime: '',
  interval: 60,
  timeSlots: [],
  reservations: [],
};

export function BusinessFormOG() {

  const { id, businessName } = useParams();
  const parsedId = id || '';
  const parsedBusinessName = businessName || '';

  const navigate = useNavigate();

  const { data, loading, error, refetch, abort } = useFetch<BusinessInfo>(getBusinessInfoUrl(parsedId));

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: initialValues,
    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      // email: (value) => (value.length < 2 ? 'Invalid email' : null),
      // businessName: (value) => (value.length < 2 ? 'Name' : null),
      // address: (value) => (value.length < 2 ? 'address' : null),
    },
  });

  const postEntity = async (entity: BusinessInfo) => {

    await postBusiness(entity).then(() => navigate(`/AllBusiness`, { replace: true }));

  }

  useEffect(() => {
      if (data) {

        form.initialize(data);
      }
    }, [data]);

  return (
    <>
    <form onSubmit={form.onSubmit((values) => postEntity(values))}>
            <Box maw={500} mx="auto">
                <TextInput
                  label="Business Name"
                  placeholder="Enter your business name"
                  withAsterisk
                  {...form.getInputProps('businessName')}
                />

                <TextInput
                  label="Email"
                  placeholder="Enter your email"
                  withAsterisk
                  {...form.getInputProps('email')}
                />

                <TextInput
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  withAsterisk
                  {...form.getInputProps('phoneNumber')}
                />

                <TextInput
                  label="Offering"
                  placeholder="Enter your default offering"
                  withAsterisk
                  {...form.getInputProps('defaultOfferingName')}
                />

                <NumberInput
                  label="Offering Price"
                  placeholder="Enter your default offering price"
                  withAsterisk
                  {...form.getInputProps('defaultOfferingPrice')}
                />

                <TextInput
                  label="Address"
                  placeholder="Enter your address"
                  withAsterisk
                  {...form.getInputProps('address')}
                />


                <NumberInput
                  label="Max Capacity"
                  placeholder="Enter your maximum capacity"
                  withAsterisk
                  {...form.getInputProps('maxCapacity')}
                />


                <NumberInput
                  label="Interval"
                  placeholder="Enter your interval"
                  withAsterisk
                  {...form.getInputProps('interval')}
                />


              <Group justify="flex-end" mt="md">
                <Button type="submit">Submit</Button>
              </Group>
            </Box>

            
          </form>
    </>
    
  );
}
