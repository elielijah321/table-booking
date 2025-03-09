import { useEffect, useState } from 'react';
import { Stepper, Button, Group, TextInput, PasswordInput, Code, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { BusinessInfo } from '@/types/Reservation/Reservation';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '@mantine/hooks';
import { getBusinessInfoUrl, postBusiness } from '@/functions/fetchEntities';
import { OrderableItems } from '@/components/OrderableItems/OrderableItems';

export function BusinessForm() {
  const [active, setActive] = useState(0);

  const { id, businessName } = useParams();
  const parsedId = id || '';
  const parsedBusinessName = businessName || '';

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

    // validate: (values) => {
    //   if (active === 0) {
    //     return {
    //       username:
    //         values.username.trim().length < 6
    //           ? 'Username must include at least 6 characters'
    //           : null,
    //       password:
    //         values.password.length < 6 ? 'Password must include at least 6 characters' : null,
    //     };
    //   }

    //   if (active === 1) {
    //     return {
    //       name: values.name.trim().length < 2 ? 'Name must include at least 2 characters' : null,
    //       email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
    //     };
    //   }

    //   return {};
    // },
  });



  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));


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
      <Stepper active={active}>
        <Stepper.Step label="First step" description="Profile settings">

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
                  label="Address"
                  placeholder="Enter your address"
                  withAsterisk
                  {...form.getInputProps('address')}
                />


        </Stepper.Step>

        <Stepper.Step label="Second step" description="Personal information">

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

          <TextInput
            label="Start Time"
            placeholder="Enter your start time"
            withAsterisk
            {...form.getInputProps('startTime')}
          />

          <TextInput
            label="End time"
            placeholder="Enter your end time"
            withAsterisk
            {...form.getInputProps('endTime')}
          />

        </Stepper.Step>

        <Stepper.Step label="Final step" description="Social media">


        <OrderableItems />

        
        </Stepper.Step>

        <Stepper.Completed>
          {/* <Code block mt="xl">
            {JSON.stringify(form.getValues(), null, 2)}
          </Code> */}
          <Button variant="default" onClick={() => postEntity(form.getValues())}>
            Confirm
          </Button>
        </Stepper.Completed>
      </Stepper>

      <Group justify="flex-end" mt="xl">
        {active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        {active !== 3 && <Button onClick={nextStep}>Next step</Button>}
      </Group>
    </>
  );
}