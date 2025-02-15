import { useEffect, useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { ReservationRequest } from '../../types/Reservation/ReservationRequest';
import Loading from '../HelperComponents/Loading';
import MyDatePicker, { MyDatePickerProps } from './DatePicker';
import TimeSlotPicker, { TimeSlotPickerProps } from './TimeSlotPicker';

function EditReservation() {
    const [hasBeenEdited] = useState(false);
    const [validated, setValidated] = useState(false);
    const [selectedEntity, setSelectedEntity] = useState<ReservationRequest>({ time: "16:00"} as ReservationRequest);

    const partSizes = ['1 guest', '2 guests'];

    const timeSlots = [
        "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", 
        "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45"
    ];
      
    const disabledSlots = ["14:00", "14:15", "14:30", "14:45"]; // Example of unavailable slots

    const navigate = useNavigate();
    const { id } = useParams();
    const parsedId = id || '';

    useEffect(() => {
        // if (parsedId !== "new") {
        //     getPersonById(parsedId).then((data) => setSelectedEntity(data));
        // }
    }, [parsedId]);

    const handleDateChange = (date: Date | null) => {
        if (date) {
            alert(date);
        }
    };

    const handleTimeSlotPickerChange = (time: string | null) => {
        if (time) {
            setSelectedEntity({ ...selectedEntity, time: time });
        }
    };

    const handleTimeSlotDropDownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedEntity({ ...selectedEntity, time: value });
    };

    const datePickerProps: MyDatePickerProps = {
        disabledDates: [new Date(2025, 15, 2)],
        onDateSelect: handleDateChange,
    };

    const timePickerProps: TimeSlotPickerProps = {
        timeSlots: timeSlots,
        disabledSlots: disabledSlots,
        highlightedSlot: selectedEntity.time,
        onTimeSelect: handleTimeSlotPickerChange,
    };

    // const handlePartySizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    //     setHasBeenEdited(true);
    // };

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
            navigate(`/People`, { replace: true });
        }
        setValidated(true);
    };

    return (
        <>
            {parsedId === "new" || selectedEntity.id !== undefined ? (
                <div className="page">
                    <h1>Make a reservation</h1>
                    <p>Select your details and we’ll try to get the best seats for you.</p>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                                    <Form.Control
                                        as="select"
                                        required
                                    >
                                        {partSizes.map((ps) => (
                                            <option key={ps} value={ps}>
                                                {ps}
                                            </option>
                                        ))}
                                    </Form.Control>
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
                                            <option key={t} value={t} selected={selectedEntity.time == t} disabled={disabledSlots.includes(t)}>
                                                {t}
                                            </option>
                                        ))}
                                    </select>
                                </Form.Group>
                            </Col>
                        </Row>

                    </Form>
                    <hr />
                        <TimeSlotPicker {...timePickerProps} />
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default EditReservation;
