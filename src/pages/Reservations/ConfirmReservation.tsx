import React, { useEffect, useState } from 'react';
import { ReservationInfo } from '../../types/Reservation/Reservation';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getShortDateFornat } from '../../helpers/DateHelper';
import { postReservation } from '../../functions/fetchEntities';
import CountdownTimer from '@/components/CountdownTimer/CountdownTimer';
import { CalendarIcon, ClockIcon, UsersIcon } from '@/components/Icons/Icons';
import classes from './ConfirmReservation.module.css';
import { Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';


const ConfirmReservation: React.FC = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const { businessName } = useParams();
    const parsedBusinessName = businessName || '';

    const [previousPageLink] = useState<string>(`/${parsedBusinessName}`);

    const [selectedEntity] = useState<ReservationInfo>(location.state.reservationInfo);

    const totalPrice = selectedEntity.businessInfo.defaultOfferingPrice * selectedEntity.reservation.partySize;


    const form = useForm({
      mode: 'uncontrolled',
      initialValues: selectedEntity,
      validate: {
        // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        // email: (value) => (value.length < 2 ? 'Invalid email' : null),
        // businessName: (value) => (value.length < 2 ? 'Name' : null),
        // address: (value) => (value.length < 2 ? 'address' : null),
      },
    });

    const handleCancel = async (event: any) => {
        event.preventDefault();

        navigate(previousPageLink, { replace: true , state: selectedEntity.reservation});
    };

    const handleContinueToPayment = async (entity: ReservationInfo) => {

      entity.reservation.pricePerItem = selectedEntity.businessInfo.defaultOfferingPrice;
      entity.reservation.businessId = selectedEntity.businessInfo.id;

        var checkoutUrl = await postReservation(selectedEntity.reservation);

        const link = document.createElement('a');
        link.href = checkoutUrl;
        document.body.appendChild(link);
        link.click();
    }

    useEffect(() => {

    }, [selectedEntity])

  return (
    <div className={classes.bookingContainer}>
      <h1 className={classes.bookingTitle}>You're almost done!</h1>
      <h3 className={classes.bookingTitle}>{parsedBusinessName}</h3>
      
      <div  className={classes.bookingHeader}>
        <div className={classes.bookingActions}>
          <div className={classes.bookingDetails}>
              <div className={classes.bookingDetail}>
                <CalendarIcon />
                <span>{getShortDateFornat(selectedEntity.reservation.reservationDate)}</span>
              </div>
              <div className={classes.bookingDetail}>
                <ClockIcon />
                <span>{selectedEntity.reservation.time}</span>
              </div>
              <div className={classes.bookingDetail}>
                <UsersIcon />
                <span>{selectedEntity.reservation.partySize} people</span>
              </div>
            </div>
        </div>

          <div className={classes.bookingActions}>
            <a className={classes.reservationCancel} onClick={handleCancel} rel="noreferrer">
              Edit reservation
            </a>
          </div>
        </div>

      <div className={classes.timerAlert}>
        <p>We're holding this reservation for you for <strong><CountdownTimer minutes={2} redirectTo={previousPageLink} /></strong> minutes</p>
      </div>

      <section className={classes.section}>
        <h3 className={classes.sectionTitle}>Reservation details</h3>
            <Row className="mb-3">
                <Col md={6}>
                <TextInput
                      label="First Name"
                      placeholder="First Name"
                      withAsterisk
                      {...form.getInputProps('selectedEntity.reservation.firstName')}
                    />
                </Col>
                <Col md={6}>
                   
          
          
          
                    <TextInput
                      label="Last Name"
                      placeholder="Last Name"
                      withAsterisk
                      {...form.getInputProps('selectedEntity.reservation.lastName')}
                    />
                </Col>
            </Row>
      </section>

      <section className={classes.section}>
        <h3 className={classes.sectionTitle}>Booking summary</h3>
        <div className={classes.experienceItem}>
          <div>
            <p>{selectedEntity.businessInfo.defaultOfferingName} £{selectedEntity.businessInfo.defaultOfferingPrice}pp</p>
            <p className={classes.subtext}>£{selectedEntity.businessInfo.defaultOfferingPrice} x {selectedEntity.reservation.partySize}</p>
          </div>
          <span className="strong">£{totalPrice.toFixed(2)}</span>
        </div>
        <div className={classes.totalRow}>
          <span>Total</span>
          <span>£{totalPrice.toFixed(2)}</span>
        </div>
      </section>

    <section className={classes.section}>
      <Group justify="flex-end" mt="xl">
          <Button className={`${classes.reservationAction} ${classes.reservationConfirm}`} onClick={() => handleContinueToPayment(form.getValues())}  >
              Continue to payment
          </Button>
      </Group>
    </section>

    </div>
  );
};

export default ConfirmReservation;