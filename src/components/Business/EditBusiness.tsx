import { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../HelperComponents/Loading';
import { BusinessInfo } from '../../types/Reservation/Reservation';
import { getBusinessInfo, postBusiness } from '../../functions/fetchEntities';
import { generateTimeSlots } from '../../helpers/DateHelper';

function EditBusiness() {
    const navigate = useNavigate();

    const { id, businessName } = useParams();
    const parsedId = id || '';
    const parsedBusinessName = businessName || '';

    const times = generateTimeSlots("9:00", "21:00", 30);

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

    const [selectedEntity, setSelectedEntity] = useState<BusinessInfo>(defaultBusinessInfo);
    // const [showParentForm, setShowParentForm] = useState(false);
    // const [parentValidated, setParentValidated] = useState(false);
    // const [offerings, setOfferings] = useState([] as Offering[]);
    // const [offering, setOffering] = useState<Offering>();






    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setSelectedEntity({ ...selectedEntity, businessName: value });
    };

    const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setSelectedEntity({ ...selectedEntity, businessType: value });
    };

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setSelectedEntity({ ...selectedEntity, email: value });
    };

    const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setSelectedEntity({ ...selectedEntity, phoneNumber: value });
    };

    const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setSelectedEntity({ ...selectedEntity, address: value });
    };

    const handleCapacityChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setSelectedEntity({ ...selectedEntity, maxCapacity: parseInt(value) });
    };

    const handleStartTimeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;

        setSelectedEntity({ ...selectedEntity, startTime: value });
    };

    const handleEndTimeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;

        setSelectedEntity({ ...selectedEntity, endTime: value });
    };

    const handleDefaultOfferingNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setSelectedEntity({ ...selectedEntity, defaultOfferingName: value });
    };

    const handleDefaultOfferingPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setSelectedEntity({ ...selectedEntity, defaultOfferingPrice: parseInt(value) });
    };

    // const cancelParent = () => {
    //     // setOffering({...offering, name: "", price: ""});
    //     setShowParentForm(false);
    // }


    // const handleDeleteParent = (id: string) => {
    //     // const newParents = selectedStudent.parents.filter((p) => p.id !== id);
    //     // setSelectedStudent({...selectedStudent, parents: newParents});
    //     // setHasBeenEdited(true);
    // }



    // const handleOfferingNameChange = (event: any) => {
    //     const name = event.target.value;
    //     // setParent({...parent, name: name, studentId: selectedStudent.id});
    //     // setHasBeenEdited(true);
    // }

    // const handleOfferingPriceChange = (event: any) => {
    //     const phoneNumber = event.target.value;
    //     // setParent({...parent, phoneNumber: phoneNumber, studentId: selectedStudent.id});
    //     // setHasBeenEdited(true);
    // }

    const handleSubmit = async (event: any) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            // if (hasBeenEdited) {
            // }

            await postBusiness(selectedEntity);
            
            navigate(`/businesses`, { replace: true });
        }
        // setValidated(true);
    };

    // const handleParentSubmit = (event: any) => {

    //     const form = event.currentTarget;
    //     event.preventDefault();
    
    //     if (form.checkValidity() === false) {
    //       event.stopPropagation();
    //     }else{
    //         // var newParents = selectedStudent.parents;

    //         // const parentID = newParents.length;
    //         // parent.id = parentID.toString();
    //         // newParents.push(parent);

    //         // setSelectedStudent({...selectedStudent, parents: newParents});
    //         // cancelParent();
    //     }
    
    //     setParentValidated(true);
    // }

   
    useEffect(() => {
        if (parsedId !== "new") {
            getBusinessInfo(parsedId).then((data) => setSelectedEntity(data));
        }

        getBusinessInfo(parsedBusinessName).then(data => {
            setSelectedEntity(data);
        });

    }, [parsedId]);

    return (
        <>
            {parsedId === "new" || selectedEntity.id !== undefined ? (
                <div className="page">
                    <div className='margin-bottom-35'>
                        <h1>Business Details</h1>
                    </div>

                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label className='centered'>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name" onChange={handleNameChange} value={selectedEntity.businessName} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formType">
                        <Form.Label className='centered'>Type</Form.Label>
                        <Form.Control type="text" placeholder="Type" onChange={handleTypeChange} value={selectedEntity.businessType} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label className='centered'>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" onChange={handleEmailChange} value={selectedEntity.email} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPhone">
                        <Form.Label className='centered'>Phone</Form.Label>
                        <Form.Control type="text" placeholder="Phone" onChange={handlePhoneChange} value={selectedEntity.phoneNumber} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAddress">
                        <Form.Label className='centered'>Address</Form.Label>
                        <Form.Control type="text" placeholder="Address" onChange={handleAddressChange} value={selectedEntity.address} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label className='centered'>Default Offering Name</Form.Label>
                        <Form.Control type="text" placeholder="Default Offering Name" onChange={handleDefaultOfferingNameChange} value={selectedEntity.defaultOfferingName} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label className='centered'>Default Offering Price</Form.Label>
                        <Form.Control type="number" placeholder="Default Offering Price" onChange={handleDefaultOfferingPriceChange} value={selectedEntity.defaultOfferingPrice} />
                    </Form.Group>

                    

                    {/* <Form.Group className="mb-3" controlId="formType">
                        <Form.Label className='centered'>Business Offerings</Form.Label>
                        <select className="form-select" aria-label="Time" onChange={handleTypeChange}>
                        {selectedEntity.businessOfferings.map(type => <option value={type} selected={selectedEntity.businessType === type}>{type}</option>)}
                        </select>
                    </Form.Group> */}

                    

                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label className='centered'>Max Capacity</Form.Label>
                        <Form.Control type="number" placeholder="Max Capacity" onChange={handleCapacityChange} value={selectedEntity.maxCapacity} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formType">
                        <Form.Label className='centered'>Start Time</Form.Label>
                        <select className="form-select" aria-label="Time" onChange={handleStartTimeChange}>
                        {times.map(time => <option value={time} selected={selectedEntity.startTime === time}>{time}</option>)}
                        </select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formType">
                        <Form.Label className='centered'>End Time</Form.Label>
                        <select className="form-select" aria-label="Time" onChange={handleEndTimeChange}>
                        {times.map(time => <option value={time} selected={selectedEntity.endTime === time}>{time}</option>)}
                        </select>
                    </Form.Group>

                    {/* {
                            selectedEntity.businessOfferings && selectedEntity.businessOfferings.length > 0 &&
                            <div>
                                <h3 className='centered'>Business Offerings</h3>
                            <Table striped hover responsive>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    selectedEntity.businessOfferings.map((offering) => (
                                        <tr key={offering.id}>
                                            <td>{offering.name}</td>
                                            <td>{offering.pricePerPerson}</td>
                                            <td>
                                                <Button className='delete-item-button' variant="danger" onClick={() => handleDeleteParent(offering.id)}>
                                                    X
                                                </Button>
                                            </td>       
                                        </tr>
                                    ))
                                }
                            </tbody>
                            </Table>
                            </div>
                        } */}
{/* 
                    {!showParentForm && <Button className='edit-form-submit' variant="primary" onClick={() => setShowParentForm(true)}>
                            Add Parent Information
                        </Button>}

                        {!showParentForm && <Button id="save" className='edit-form-submit' variant="primary" type="submit">
                            Save
                        </Button>} */}


                        {/* {showParentForm && 
                        <Form noValidate validated={parentValidated} onSubmit={event => handleParentSubmit(event)}>

                            <Form.Group className="mb-3" controlId="formParent">
                                <Form.Label>Parent Contact Information</Form.Label>
                                <Row>
                                        <Col>
                                        <Form.Control 
                                            placeholder="Name" 
                                            type='text'
                                            onChange={handleOfferingNameChange}
                                            value={offering?.name}
                                            required
                                        />
                                    </Col>
                                    <Col>
                                    <Form.Control 
                                        placeholder="Price"
                                        type='number'
                                        required
                                        value={offering?.pricePerPerson}
                                        onChange={handleOfferingPriceChange}
                                        /> 
                                    </Col>
                                    <Col>
                                    <Button className='edit-form-submit' variant="primary" type="submit" >
                                        Enter
                                    </Button>
                                    <Button className='edit-form-submit' variant="primary" onClick={cancelParent}>
                                        Cancel
                                    </Button>
                                    </Col>    
                                </Row>
                            </Form.Group>
                        </Form>} */}

                    <Button id="save" className="edit-form-submit" variant="primary" onClick={handleSubmit}>
                        Save
                    </Button>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default EditBusiness;
