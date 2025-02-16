import React, { ChangeEvent, useState } from 'react';
import { RestaurantInfo } from '../../types/Reservation/Reservation';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { CalendarIcon, ClockIcon, UsersIcon } from '../Icons/Icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { getShortDateFornat } from '../../helpers/DateHelper';


const ConfirmReservation: React.FC = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [selectedEntity, setSelectedEntity] = useState<RestaurantInfo>(location.state.restaurantInfo);

    const [stripeCheckoutUrl] = useState<string>(location.state.checkoutUrl);

    const [formIsInvalid, setIsFormInvalid] = useState<boolean>(true);

    const totalPrice = selectedEntity.offering.pricePerPerson * selectedEntity.reservation.partySize;

    const handleCancel = async (event: any) => {
        event.preventDefault();

        navigate(`/Reservation/new/edit`, { replace: true , state: selectedEntity.reservation});
    };

    const handleContinueToPayment = async (event: any) => {
        event.preventDefault();

        const link = document.createElement('a');
        link.href = stripeCheckoutUrl;
        document.body.appendChild(link);
        link.click();
    }

    const isFormInvalid = () => {

        var _reservation = selectedEntity.reservation;

        var result = _reservation.firstname.length < 3 && _reservation.lastname.length < 3;

        return result;
    }

    const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        var _reservation = selectedEntity.reservation;

        _reservation.firstname = value;

        setSelectedEntity({ ...selectedEntity, reservation: _reservation });
        setIsFormInvalid(isFormInvalid());
    };

    const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        var _reservation = selectedEntity.reservation;

        _reservation.lastname = value;

        setSelectedEntity({ ...selectedEntity, reservation: _reservation });
        setIsFormInvalid(isFormInvalid());
    };

  return (
    <div className="booking-container">
      <h1 className="booking-title">You're almost done!</h1>
      
      <div className="booking-header">
        <div className="restaurant-name">{selectedEntity.name}</div>

        <div className="restaurant-info">
          <div className="booking-details float-right">
            <div className="booking-detail">
              <CalendarIcon />
              <span>{getShortDateFornat(selectedEntity.reservation.date)}</span>
            </div>
            <div className="booking-detail">
              <ClockIcon />
              <span>{selectedEntity.reservation.time}</span>
            </div>
            <div className="booking-detail">
              <UsersIcon />
              <span>{selectedEntity.reservation.partySize} people</span>
            </div>
          </div>
        </div>
      </div>

      <div className="timer-alert">
        <p>We're holding this reservation for you for <strong>2:00 minutes</strong></p>
      </div>

      <section className="section">
        <h3 className="section-title">Reservation details</h3>
            <Row className="mb-3">
                <Col md={6}>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                            type="text" 
                            placeholder="First Name" 
                            onChange={handleFirstNameChange} 
                            value={selectedEntity.reservation.firstname} 
                            required
                            />
                </Col>
                <Col md={6}>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                            type="text" 
                            placeholder="Last Name" 
                            onChange={handleLastNameChange} 
                            value={selectedEntity.reservation.lastname} 
                            required
                            />
                </Col>
            </Row>
      </section>

      <section className="section">
        <h3 className="section-title">Booking summary</h3>
        <div className="experience-item">
          <div>
            <p>{selectedEntity.offering.name} £{selectedEntity.offering.pricePerPerson}pp</p>
            <p className="subtext">£{selectedEntity.offering.pricePerPerson} x {selectedEntity.reservation.partySize}</p>
          </div>
          <span className="strong">£{totalPrice.toFixed(2)}</span>
        </div>
        <div className="total-row">
          <span>Total</span>
          <span>£{totalPrice.toFixed(2)}</span>
        </div>
      </section>

    <section className="section">
        <a className='reservation-action-button reservation-cancel-button' onClick={handleCancel} rel="noreferrer">Edit reservation</a>
        
        <Button disabled={formIsInvalid} variant='success' className="reservation-action-button reservation-confirm-button" onClick={handleContinueToPayment}  >
            Continue to payment
        </Button>
    </section>

    </div>
  );
};

export default ConfirmReservation;