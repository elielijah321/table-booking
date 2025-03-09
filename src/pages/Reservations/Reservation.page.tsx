import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Select, Text, Title, NumberInput, Grid, Container, Divider } from '@mantine/core';
import { DateInput, DatePicker } from '@mantine/dates';
import { ReservationRequest } from '../../types/Reservation/ReservationRequest';
import { BusinessInfo, ReservationInfo } from '../../types/Reservation/Reservation';
import { getBusinessInfo, postGetBusinessDisabledTimeSlots } from '../../functions/fetchEntities';
import { GetBusinessDisabledTimeSlotsRequest } from '../../types/RequestModels/GetBusinessDisabledTimeSlotsRequest';
import { TimeSlotPicker } from '@/components/TimeSlots/TimeSlotPicker';
import classes from './ReservationPage.module.css';
import { time } from 'console';

function ReservationPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id, businessName } = useParams();
    
    const parsedId = id || '';
    const parsedBusinessName = businessName || '';

    
    const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);
    const [disabledSlots, setDisabledSlots] = useState<string[]>([]);
    const [selectedEntity, setSelectedEntity] = useState<ReservationRequest>({
        id: '00000000-0000-0000-0000-000000000000',
        partySize: 1,
        reservationDate: new Date(),
        time: "9:00",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        notes: "",
        status: "",
        createdAt: "",
        updatedAt: "",
        pricePerItem: 0,
        businessId: '10000000-0000-0000-0000-000000000000'
        });




    useEffect(() => {
        getBusinessInfo(parsedBusinessName).then((data) => {
            setBusinessInfo(data);
            setSelectedEntity({...selectedEntity, businessId: data.id});

            postGetBusinessDisabledTimeSlots({
                businessId: data.id,
                partySize: selectedEntity.partySize,
                date: selectedEntity.reservationDate,
            }).then(d => {

              setDisabledSlots(d);

              // TODO: NOT FINISHED YET 
              setSelectedEntity({...selectedEntity, time: d[0] ?? "12:00"});
            });
        });
    }, [parsedBusinessName, selectedEntity.partySize, selectedEntity.reservationDate]);

    const handleDateChange = (date: Date | null) => {
        if (date) {
            setSelectedEntity({ ...selectedEntity, reservationDate: date });
        }
    };

    const handleTimeSlotChange = (time: string | null) => {
        if (time) {
            setSelectedEntity({ ...selectedEntity, time });
        }
    };

    const handlePartySizeChange = (value: string | null) => {

      if (value) {
        setSelectedEntity({ ...selectedEntity, partySize: parseInt(value) });
      }

    };

    const handleSubmit = () => {
        if (businessInfo) {
            const reservationInfo: ReservationInfo = {
                businessInfo,
                reservation: selectedEntity,
            };
            navigate(`/${parsedBusinessName}/confirm`, { state: { reservationInfo } });
        }
    };

    const generateCapacity = (maxCapacity: number | undefined) => {
      if (maxCapacity === undefined || maxCapacity <= 0) {
        return [];
      }
      
      return Array.from({ length: maxCapacity }, (_, index) => (index + 1).toString());
    };


    return (
        <Container size="md">
            <Title className={classes.center} order={1} mb="sm">Make a Reservation</Title>
            
            <Text className={classes.center} mb="xl">Select your details and we’ll get the best seats for you.</Text>

            <Grid gutter="md">
                <Grid.Col span={4}>
                    <Select
                        label="Time"
                        data={generateCapacity(businessInfo?.maxCapacity)}
                        value={selectedEntity.partySize.toString()}
                        onChange={handlePartySizeChange}
                        // data={[
                        //   { value: "apple", label: "Apple" },
                        //   { value: "banana", label: "Banana", disabled: true }, // Disabled option
                        //   { value: "orange", label: "Orange" },
                        //   { value: "grape", label: "Grape", disabled: true }, // Disabled option
                        // ]}
                    />
                </Grid.Col>
                <Grid.Col span={4}>
                <DateInput
                    value={selectedEntity.reservationDate}
                    onChange={handleDateChange}
                    label="Date"
                    placeholder="Date input"
                    />
                </Grid.Col>
                <Grid.Col span={4}>
                    <Select
                        label="Time"
                        data={businessInfo?.timeSlots?.filter(slot => !disabledSlots.includes(slot)) || []}
                        value={selectedEntity.time}
                        onChange={handleTimeSlotChange}
                    />
                </Grid.Col>
            </Grid>

            <Divider my="xl" />
            <Title className={classes.center} order={2} mb="md">Choose an available time slot</Title>
            <TimeSlotPicker 
              timeSlots={businessInfo?.timeSlots} 
              disabledSlots={[]} 
              highlightedSlot={selectedEntity.time} 
              onTimeSelect={handleTimeSlotChange} 
              />

            <Button fullWidth mt="xl" onClick={handleSubmit}>Confirm Reservation</Button>
        </Container>
    );
}

export default ReservationPage;
