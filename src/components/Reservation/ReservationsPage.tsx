import { useEffect, useState } from 'react'
import { Accordion, Button, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { canEdit } from '../../helpers/UserHelper';
import { Reservation } from '../../types/Reservation/Reservation';
import { getAllReservations } from '../../functions/fetchEntities';
import { getDisplayDateAndTime } from '../../helpers/DateHelper';

function ReservationsPage() {

  // const state = useSelector((state: RootState) => state.systemUser);
  // const systemUser = state.systemUser;

  const [entities, setEntities] = useState<Reservation[] | undefined>(undefined);

  const { businessName } = useParams();
  const parsedBusinessName = businessName || '';

  useEffect(() => {
    // fetch data
    getAllReservations(parsedBusinessName)
      .then(entities => setEntities(entities));
  }, [])

  return (
    <>
      <div className='page'>
        <div className='entity-button-container'>
          {
            //systemUser
            canEdit() &&
            <div className='add-new-entity-btn'>
                  <Link className="navitem" to={`/${parsedBusinessName}/reservation/new/edit`}>
                      <Button variant="primary" className="mb-3">
                          Add Reservation
                      </Button>
                  </Link>
              </div>
            }
        </div>
        
        {entities !== undefined ?
        (
          <div>
            <Accordion defaultActiveKey={"reservation"}>
                <Accordion.Item key={"reservation"} eventKey={"reservation"}>
                        <Accordion.Header>{"Reservations"}</Accordion.Header>
                        <Accordion.Body>
                          {
                          entities.length > 0 ? 
                          <div>
                            <Table striped hover responsive>
                              <thead>
                                  <tr>
                                      <th>First Name</th>
                                      <th>Date</th>
                                      <th>Party Size</th>
                                      <th>Phone Number</th>
                                      <th>Notes</th>
                                      <th></th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {entities.map((_entity: Reservation) => {


                                    console.log("entity: ", _entity);
                         
                                    return (
                                      <tr key={_entity.id}>
                                          <td>{_entity.firstName} {_entity.lastName}</td>
                                          <td>{getDisplayDateAndTime(_entity.reservationDate)}</td>
                                          <td>{_entity.partySize}</td>
                                          <td>{_entity.phoneNumber}</td>
                                          <td>{_entity.notes}</td>
                                          <td>
                                            {
                                              <Button onClick={() => alert("")}>
                                                  Edit
                                              </Button>
                                            }
                                              
                                          </td>
                                      </tr>
                                  )
                                  })}
                              </tbody>
                            </Table>
                          </div> : <div>No Entities.</div>
                          }
                        </Accordion.Body>
                </Accordion.Item>
            </Accordion>
          </div> 
        )
        : <div>Business not found</div> }

      </div>
    </>
  )
}

export default ReservationsPage;