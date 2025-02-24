import { useEffect, useState } from 'react'
import { Accordion, Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { canEdit } from '../../helpers/UserHelper';
import { BusinessInfo } from '../../types/Reservation/Reservation';
import Loading from '../HelperComponents/Loading';
import { getAllBusinesses } from '../../functions/fetchEntities';

function BusinessesPage() {

  // const state = useSelector((state: RootState) => state.systemUser);
  // const systemUser = state.systemUser;

  const navigate = useNavigate();
  const [entities, setEntities] = useState<BusinessInfo[] | undefined>(undefined);

  const handleEdit = (id: string) => {
    navigate(`/business/${id}/edit`, { replace: true });
  }

  useEffect(() => {
    // fetch data
    getAllBusinesses()
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
                  <Link className="navitem" to={`/business/new/edit`}>
                      <Button variant="primary" className="mb-3">
                          Add Business
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
                                      <th>Name</th>
                                      <th>Reservations</th>
                                      <th>Max Capacity</th>
                                      <th>Start Time</th>
                                      <th>End Time</th>
                                      <th></th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {entities.map((_entity: BusinessInfo) => {

                                    return (
                                      <tr key={_entity.id}>
                                          <td>{_entity.businessName}</td>
                                          <td>{_entity.reservations.length}</td>
                                          <td>{_entity.maxCapacity}</td>
                                          <td>{_entity.startTime}</td>
                                          <td>{_entity.endTime}</td>
                                          <td>
                                            {
                                              <Button onClick={() => handleEdit(_entity.id)} variant="primary" className="mb-3">
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
        : <Loading /> }

      </div>
    </>
  )
}

export default BusinessesPage;