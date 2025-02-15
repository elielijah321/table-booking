import { useState } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ReservationRequest } from '../../types/Reservation/ReservationRequest';
import Loading from '../HelperComponents/Loading';

function ConfirmReservation() {
    const location = useLocation();
    const navigate = useNavigate();

    
    const [selectedEntity] = useState<ReservationRequest>(location.state.selectedEntity);
    const [stripeCheckoutUrl ] = useState<string>(location.state.checkoutUrl);

    const { id } = useParams();
    const parsedId = id || '';

    const handleCancel = async (event: any) => {
        event.preventDefault();

        navigate(`/Reservation/new/edit`, { replace: true , state: selectedEntity});

        // if (window.confirm(`Are you sure you want to delete ${selectedEntity.name}`)) {
        //     await deletePersonById(selectedEntity.id);
        //     navigate('/People', { replace: true });
        // }
    };

    return (
        <>
            {parsedId === "new" || selectedEntity.id !== undefined ? (
                <div className="page">
                    <div className='margin-bottom-35'>
                        <h3>Confirm your reservation</h3>
                    </div>

                    <Row>
                        <Col md={12}>
                            <div className="reservation-confirmation-container">
                            <h5 className="reservation-confirmation-header">Reservation Details:</h5>

                            <Table className="reservation-confirmation-table">
                                <tbody>
                                <tr>
                                    <td>
                                        {selectedEntity.firstname} {selectedEntity.lastname}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        {selectedEntity.date.toDateString()}, {selectedEntity.time}
                                    </td>
                                </tr>
                                <tr>
                                    <td>{selectedEntity.partySize} guest</td>
                                </tr>
                                </tbody>
                            </Table>

                            <h5 className="reservation-confirmation-header">Prepayment Details:</h5>

                            <Table className="reservation-confirmation-table">
                                <tbody>
                                <tr>
                                    <td>£5.00 x {selectedEntity.partySize} guests</td>
                                    <td>
                                        £{(5.00 * selectedEntity.partySize).toFixed(2)}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <button 
                                            className="reservation-action-button reservation-cancel-button"
                                            onClick={handleCancel}
                                        >Change Selection</button>
                                    </td>

                                    <td>
                                        <a href={stripeCheckoutUrl} rel="noreferrer">
                                            <button className="reservation-action-button reservation-confirm-button">Continue to payment</button>
                                        </a>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                            </div>
                        </Col>
                    </Row>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default ConfirmReservation;
