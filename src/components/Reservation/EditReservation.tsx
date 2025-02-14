import { ChangeEvent, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { ReservationRequest } from '../../types/Reservation/ReservationRequest';
import Loading from '../HelperComponents/Loading';
import { deletePersonById, getPersonById, postPerson } from '../../functions/fetchEntities';
import MyDatePicker, { MyDatePickerProps } from '../HelperComponents/DatePicker';

function EditReservation() {

    const [hasBeenEdited, setHasBeenEdited] = useState(false);
    const [validated, setValidated] = useState(false);

    const [selectedEntity, setSelectedEntity] = useState<ReservationRequest>({} as ReservationRequest);

    // const [partySizes, setPartySizes] = useState();


    const partSizes = ['1 guest', '2 guests'];




    const navigate = useNavigate();

    const { id } = useParams();
    const parsedId = id !== undefined ? id : "";

    useEffect(() => {
        if (parsedId !== "new") {
            getPersonById(parsedId)
                .then((data) => setSelectedEntity(data));
        }
    }, [parsedId]);



    const handleDateChange = (date: Date | null) => {
        // setSelectedDate(date);

        if (date) {
            alert(date)
        //   onDateSelect(date); // Pass the selected date to the parent component
        }
      };

    const datePickerProps : MyDatePickerProps = { disabledDates: [new Date(2025, 15, 2)], onDateSelect: handleDateChange }


    const handlePartySizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const pc = event.target.value;
        // setRabbit({ ...rabbit, gender})
      }



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
                await postPerson(selectedEntity);
            }
            navigate(`/People`, { replace: true });
        }
        setValidated(true);
    };

    return (
        <>
            {parsedId === "new" || selectedEntity.id !== undefined ?
                <div className='page'>
                    <h1>Edit Reservation</h1>
                    <Form noValidate validated={validated} onSubmit={event => handleSubmit(event)}>

                        <div className='edit-action-btns'>
                            <Button id="save" className='edit-form-submit' variant="primary" type="submit">
                                Save
                            </Button>

                            {parsedId !== "new" &&
                                (
                                    <Button id="save" className='edit-form-submit' variant="danger" onClick={handleDelete} >
                                        Delete
                                    </Button>
                                )
                            }
                        </div>

                        <div className="margin-top d-flex">

                            <Form.Group className="mb-3" controlId="formBreed">
                                <Form.Label className='centered'>Party Size</Form.Label>
                                <select className="form-select" aria-label="Breed" onChange={handlePartySizeChange}>
                                {partSizes.map(ps => <option value={ps} >{ps}</option>)}
                                </select>
                            </Form.Group>

                            {
                                MyDatePicker(datePickerProps)
                            }

                            <Form.Group className="mb-3" controlId="formBreed">
                                <Form.Label className='centered'>Party Size</Form.Label>
                                <select className="form-select" aria-label="Breed" onChange={handlePartySizeChange}>
                                {partSizes.map(ps => <option value={ps} >{ps}</option>)}
                                </select>
                            </Form.Group>

                        </div>
                        
                    </Form>
                </div> : <Loading />
            }
        </>
    );
}

export default EditReservation;
