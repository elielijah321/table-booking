import { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ReservationRequest } from '../../types/Reservation/ReservationRequest';
import Loading from '../HelperComponents/Loading';
import MyDatePicker, { MyDatePickerProps } from './DatePicker';
import TimeSlotPicker from './TimeSlotPicker';
import { BusinessInfo, ReservationInfo } from '../../types/Reservation/Reservation';
import { getBusinessInfo, postGetBusinessDisabledTimeSlots } from '../../functions/fetchEntities';
import { GetBusinessDisabledTimeSlotsRequest } from '../../types/RequestModels/GetBusinessDisabledTimeSlotsRequest';

function EditReservation() {
    const location = useLocation();
    const navigate = useNavigate();

    const { id, businessName } = useParams();
    const parsedId = id || '';
    const parsedBusinessName = businessName || '';

    const defaultBusinessInfo: BusinessInfo = {
        id: "",
        businessName: "Loading...", 
        businessType: "",
        email: "",
        phoneNumber: "",
        address: "",
        defaultOfferingName: "",
        defaultOfferingPrice: 0,
        businessOfferings: [],
        timeSlots: [],
        maxCapacity: 0,
        reservations: [],
        startTime: "",
        endTime: "",
    };

    const defaultReservationRequest = {
        partySize: 1, 
        reservationDate: new Date(2025, 1, 17), 
        time: "9:00"
    } as ReservationRequest;


    const [validated, setValidated] = useState(false);
    const [selectedEntity, setSelectedEntity] = useState<ReservationRequest>(location.state ||  defaultReservationRequest);
    const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(defaultBusinessInfo);
    const [disabledSlots, setDisabledSlots] = useState<string[]>([]);
    const [timePickerKey, setTimePickerKey] = useState(0);
   
    
    const handleDateChange = (date: Date | null) => {
        if (date) {

            var _date = new Date(date);

            postGetBusinessDisabledTimeSlots({businessId: businessInfo.id, partySize: selectedEntity.partySize, date: _date}).then(data => {

                setDisabledSlots(data);
                setSelectedEntity({ ...selectedEntity, reservationDate: _date, time: getFirstAvailableTimeSlot(businessInfo, data) });

            });
        }
    };

    const datePickerProps: MyDatePickerProps = {
        selectedDate: selectedEntity.reservationDate ? new Date(selectedEntity.reservationDate) : new Date(2025, 1, 17),
        disabledDates: [new Date(2025, 15, 2)],
        onDateSelect: handleDateChange,
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

        var _partySize = parseInt(value);
        setSelectedEntity({ ...selectedEntity, partySize: _partySize });

        postGetBusinessDisabledTimeSlots({businessId: businessInfo.id, partySize: _partySize, date: selectedEntity.reservationDate}).then(data => {

            setDisabledSlots(data);

            setSelectedEntity({ ...selectedEntity, partySize: _partySize, time: getFirstAvailableTimeSlot(businessInfo, data) });

            // setSelectedEntity({...selectedEntity, time: getFirstAvailableTimeSlot(businessInfo, data)});
        });
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

              const reservationInfo: ReservationInfo = {
                    businessInfo: businessInfo,
                    reservation: selectedEntity,
                };

            navigate(`/${parsedBusinessName}/reservation/new/confirm`, { replace: true , state: {reservationInfo}});
        }
        setValidated(true);
    };


    const getFirstAvailableTimeSlot = (businessInfo: BusinessInfo, disabledSlots: string[]) => 
    {
        const availableDates = businessInfo.timeSlots.filter(date => !disabledSlots.includes(date));

        return availableDates[0];
    }

    const drawTimePickerComponent = () => {
        return (
            <TimeSlotPicker
                key={timePickerKey}
                timeSlots={businessInfo.timeSlots}
                disabledSlots={disabledSlots}
                highlightedSlot={selectedEntity.time}
                onTimeSelect={handleTimeSlotPickerChange}
            />
        );
    }

    const drawPartySizeSelectOptions = (maxCapacity: number) => {
        return Array.from({ length: maxCapacity }, (_, i) => i + 1).map((ps) => (
            <option key={ps} selected={selectedEntity.partySize === ps} value={ps}>
                {ps > 1 ? `${ps} people` : '1 person'}
            </option>
        ));
    };

    useEffect(() => {
        if (parsedId !== "new") {
            // getPersonById(parsedId).then((data) => setSelectedEntity(data));
        }

        getBusinessInfo(parsedBusinessName).then(data => {
            setBusinessInfo(data);

            var request: GetBusinessDisabledTimeSlotsRequest = {
                businessId: data.id,
                partySize: selectedEntity.partySize,
                date: selectedEntity.reservationDate
            };

            postGetBusinessDisabledTimeSlots(request).then(slots => {
                setDisabledSlots(slots)
    
                setSelectedEntity({...selectedEntity, time: getFirstAvailableTimeSlot(data, slots)});
            });
        });

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
                                        {drawPartySizeSelectOptions(businessInfo.maxCapacity)}
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
