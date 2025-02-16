import { useEffect, useState } from 'react'
import { Accordion, Button, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { canEdit } from '../../helpers/UserHelper';
import { Reservation } from '../../types/Reservation/Reservation';
import Loading from '../HelperComponents/Loading';

function ReservationsPage() {

  // const state = useSelector((state: RootState) => state.systemUser);
  // const systemUser = state.systemUser;

  const [entities, setEntities] = useState<Reservation[] | undefined>(undefined);
  // const [searchTerm, setSearchTerm] = useState<string>("");


      const { businessName } = useParams();
      const parsedBusinessName = businessName || '';


  // const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const name = event.target.value;
  //   setSearchTerm(name);

  //   if(name === "")
  //   {
  //     getAllPeople()
  //       .then(entities => setEntities(entities));

  //   }else{
  //     searchAllPeople(name)
  //     .then(entities => setEntities(entities));
  //   }
    
  // }

  useEffect(() => {
    // fetch data
    // getAllPeople()
    //   .then(entities => setEntities(entities));

    setEntities([]);
  }, [])

  return (
    <>
      <div className='page'>
        <div className='entity-button-container'>
          {/* <div className='search-input'>
            <Form.Group className="mb-3">
                <Form.Control 
                id="edit-name"
                type="text" 
                placeholder="Search..." 
                onChange={handleSearchChange} 
                value={searchTerm} 
                required
                />
            </Form.Group>
          </div> */}

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
                                      {/* <th>Name</th> */}
                                      <th></th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {entities.map((_entity: Reservation) => {

                                    return (
                                      <tr key={_entity.id}>
                                          {/* <td>{_entity.name}</td> */}
                                          <td>
                                            {
                                              <Link to={`/Person/${_entity.id}/edit`} className="button">
                                                  <Button id={`${_entity.id}-btn`}>
                                                      Edit
                                                  </Button>
                                              </Link>
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

export default ReservationsPage;