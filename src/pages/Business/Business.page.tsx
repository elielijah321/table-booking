import { Burger, Button, Drawer, Group } from '@mantine/core';
import { Welcome } from '../../components/Welcome/Welcome';
import { FloatingLabelInput } from '@/components/Input/FloatingLabel/FloatingLabelInput';
import { useForm } from '@mantine/form';
import { BusinessForm } from '@/pages/Business/Business.form';




export function BusinessPage() {
  
  return (
    <>
      <Welcome />

      <BusinessForm />


    </>
  );
}
