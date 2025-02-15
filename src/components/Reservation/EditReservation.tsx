import { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ReservationRequest } from '../../types/Reservation/ReservationRequest';
import Loading from '../HelperComponents/Loading';
import MyDatePicker, { MyDatePickerProps } from './DatePicker';
import TimeSlotPicker, { TimeSlotPickerProps } from './TimeSlotPicker';

function EditReservation() {
    const [hasBeenEdited] = useState(false);
    const [validated, setValidated] = useState(false);
    const [selectedEntity, setSelectedEntity] = useState<ReservationRequest>({ partySize: 1, date: new Date(2025, 1, 17).toISOString(), time: "16:00"} as ReservationRequest);

    const partSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    const timeSlots = [
        "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", 
        "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45",
        "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45",
        "20:00", "20:15", "20:30", "20:45", "21:00"
    ];
      
    const disabledSlots = ["14:00", "14:15", "14:30", "14:45"]; // Example of unavailable slots

    // const navigate = useNavigate();
    const { id } = useParams();
    const parsedId = id || '';

    const handleDateChange = (date: Date | null) => {
        if (date) {
            setSelectedEntity({ ...selectedEntity, date: new Date(date).toISOString() });
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
    };

    const handlePartySizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedEntity({ ...selectedEntity, time: value });
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
            if (hasBeenEdited) {
                // await postPerson(selectedEntity);
            }
            // navigate(`/People`, { replace: true });

            alert('Reservation made successfully!\n\n' + JSON.stringify(selectedEntity, null, 2));
        }
        setValidated(true);
    };


    const datePickerProps: MyDatePickerProps = {
        selectedDate: selectedEntity.date ? new Date(selectedEntity.date) : new Date(2025, 1, 17),
        disabledDates: [new Date(2025, 15, 2)],
        onDateSelect: handleDateChange,
    };

    const timePickerProps: TimeSlotPickerProps = {
        timeSlots: timeSlots,
        disabledSlots: disabledSlots,
        highlightedSlot: selectedEntity.time,
        onTimeSelect: handleTimeSlotPickerChange,
    };

    useEffect(() => {
        if (parsedId !== "new") {
            // getPersonById(parsedId).then((data) => setSelectedEntity(data));
        }
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
                                        {partSizes.map((ps) => (
                                            <option key={ps} selected={selectedEntity.partySize == ps} value={ps}>
                                                {ps} guest{ps > 1 ? 's' : ''}
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
                                    {timeSlots.map((t) => (
                                            <option key={t} selected={selectedEntity.time == t} value={t} disabled={disabledSlots.includes(t)}>
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
                    <TimeSlotPicker {...timePickerProps} />
                    <Button id="save" className="edit-form-submit" variant="primary" onClick={handleSubmit}>
                        Reserve Now
                    </Button>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default EditReservation;
