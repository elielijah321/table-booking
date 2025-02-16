import { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ReservationRequest } from '../../types/Reservation/ReservationRequest';
import Loading from '../HelperComponents/Loading';
import MyDatePicker, { MyDatePickerProps } from './DatePicker';
import TimeSlotPicker from './TimeSlotPicker';
import { BusinessInfo, RestaurantInfo } from '../../types/Reservation/Reservation';
import { getBusinessInfo } from '../../functions/fetchEntities';

function EditReservation() {
    const location = useLocation();
    const navigate = useNavigate();

    const defaultBusinessInfo: BusinessInfo = {
        businessName: "Loading...", // Default placeholder values
        businessOfferings: [],
        timeSlots: [],
        disabledSlots: [],
        partySizes: []
    };

    const [validated, setValidated] = useState(false);
    const [selectedEntity, setSelectedEntity] = useState<ReservationRequest>(location.state || { partySize: 1, date: new Date(2025, 1, 17), time: "19:15"} as ReservationRequest);
    const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(defaultBusinessInfo);

    const [timePickerKey, setTimePickerKey] = useState(0);

    const { id, businessName } = useParams();
    const parsedId = id || '';
    const parsedBusinessName = businessName || '';


    const handleDateChange = (date: Date | null) => {
        if (date) {
            setSelectedEntity({ ...selectedEntity, date: new Date(date) });
        }
    };

    const handleTimeSlotPickerChange = (time: string | null) => {
        if (time) {
            setSelectedEntity({ ...selectedEntity, time: time });
        }
    };

    const handleTimeSlotDropDownChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedEntity({ ...selectedEntity, time: value });
        
        // Force TimeSlotPicker to re-render
        setTimePickerKey((prevKey) => prevKey + 1);
    };

    const handlePartySizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedEntity({ ...selectedEntity, partySize: parseInt(value) });
    };


    const handleDelete = async (event: any) => {
        event.preventDefault();
        // if (window.confirm(`Are you sure you want to delete ${selectedEntity.name}`)) {
        //     await deletePersonById(selectedEntity.id);
        //     navigate('/People', { replace: true });
        // }
    };

    const handleSubmit = async (event: any) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            // if (hasBeenEdited) {
            // }

              const restaurantInfo: RestaurantInfo = {
                    name: businessInfo.businessName,
                    reservation: selectedEntity,
                    offering: businessInfo.businessOfferings[0]
                };

            navigate(`/${parsedBusinessName}/reservation/new/confirm`, { replace: true , state: {restaurantInfo}});
        }
        setValidated(true);
    };


    const datePickerProps: MyDatePickerProps = {
        selectedDate: selectedEntity.date ? new Date(selectedEntity.date) : new Date(2025, 1, 17),
        disabledDates: [new Date(2025, 15, 2)],
        onDateSelect: handleDateChange,
    };


    const drawTimePickerComponent = () => {
        return (
            <TimeSlotPicker
                key={timePickerKey}
                timeSlots={businessInfo.timeSlots}
                disabledSlots={businessInfo.disabledSlots}
                highlightedSlot={selectedEntity.time}
                onTimeSelect={handleTimeSlotPickerChange}
            />
        );
    }

    useEffect(() => {
        if (parsedId !== "new") {
            // getPersonById(parsedId).then((data) => setSelectedEntity(data));
        }

        getBusinessInfo(parsedBusinessName).then(data => setBusinessInfo(data));
    }, [parsedId]);

    return (
        <>
            {parsedId === "new" || selectedEntity.id !== undefined ? (
                <div className="page">
                    <div className='margin-bottom-35'>
                        <h1>Make a reservation</h1>
                        <p>Select your details and we’ll try to get the best seats for you.</p>
                    </div>

                    <Form className='margin-bottom-35' noValidate validated={validated} onSubmit={handleSubmit}>
                        <div className="edit-action-btns mb-4">
                            {/* <Button id="save" className="edit-form-submit" variant="primary" type="submit">
                                Save
                            </Button> */}

                            {parsedId !== "new" && (
                                <Button id="delete" className="edit-form-submit" variant="danger" onClick={handleDelete}>
                                    Delete
                                </Button>
                            )}
                        </div>

                        <Row className="mb-3">
                            {/* Party Size Selection */}
                            <Col md={4}>
                                <Form.Group controlId="formPartySize">
                                    <Form.Label className="centered">Party Size</Form.Label>
                                    <select className="form-select" aria-label="Time" onChange={handlePartySizeChange}>
                                        {businessInfo.partySizes?.map((ps) => (
                                            <option key={ps} selected={selectedEntity.partySize == ps} value={ps}>
                                                {ps > 1 ? `${ps} people` : '1 person'}
                                            </option>
                                        ))}
                                    </select>
                                </Form.Group>
                            </Col>

                            {/* Date Picker */}
                            <Col md={4}>
                                <Form.Group controlId="formDate">
                                    <Form.Label className="centered">Date</Form.Label>
                                    <MyDatePicker {...datePickerProps} />
                                </Form.Group>
                            </Col>

                            {/* Time Picker */}
                            <Col md={4}>

                                <Form.Group className="mb-3" controlId="formTime">
                                    <Form.Label className='centered'>Time</Form.Label>
                                    <select className="form-select" aria-label="Time" onChange={handleTimeSlotDropDownChange}>
                                    {businessInfo.timeSlots.map((t) => (
                                            <option key={t} selected={selectedEntity.time == t} value={t} disabled={businessInfo.disabledSlots.includes(t)}>
                                                {t}
                                            </option>
                                        ))}
                                    </select>
                                </Form.Group>
                            </Col>
                        </Row>

                    </Form>
                    <hr className='margin-bottom-35' />
                    <h2 className="text-lg font-semibold margin-bottom-35">Choose an available time slot</h2>
                    <div className='margin-bottom-35'>
                        {drawTimePickerComponent()}
                    </div>

                    <Button id="save" className="edit-form-submit" variant="primary" onClick={handleSubmit}>
                        Confirm Reservation
                    </Button>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default EditReservation;
