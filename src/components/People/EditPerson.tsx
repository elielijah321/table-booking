import { ChangeEvent, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { PersonRequest } from '../../types/People/PersonRequest';
import Loading from '../HelperComponents/Loading';
import { deletePersonById, getPersonById, postPerson } from '../../functions/fetchEntities';

function EditPerson() {

    const [hasBeenEdited, setHasBeenEdited] = useState(false);
    const [validated, setValidated] = useState(false);

    const [selectedEntity, setSelectedEntity] = useState<PersonRequest>({} as PersonRequest);


    const navigate = useNavigate();

    const { id } = useParams();
    const parsedId = id !== undefined ? id : "";

    useEffect(() => {
        if (parsedId !== "new") {
            getPersonById(parsedId)
                .then((data) => setSelectedEntity(data));
        }
    }, [parsedId]);



    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const title = event.target.value;
        setSelectedEntity({ ...selectedEntity, name: title });
        setHasBeenEdited(true);
    };


    const handleDelete = async (event: any) => {
        event.preventDefault();
        if (window.confirm(`Are you sure you want to delete ${selectedEntity.name}`)) {
            await deletePersonById(selectedEntity.id);
            navigate('/People', { replace: true });
        }
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
                    <h1>Edit Person</h1>
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
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Name"
                                    onChange={handleNameChange}
                                    value={selectedEntity.name}
                                    required
                                />
                            </Form.Group>

                        </div>
                        
                    </Form>
                </div> : <Loading />
            }
        </>
    );
}

export default EditPerson;
