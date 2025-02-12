import { useEffect, useState } from 'react'
import { Accordion, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { canEdit } from '../../helpers/UserHelper';
import { Person } from '../../types/People/Person';
import Loading from '../HelperComponents/Loading';
import { getAllPeople } from '../../functions/fetchEntities';

function PeoplePage() {

  // const state = useSelector((state: RootState) => state.systemUser);
  // const systemUser = state.systemUser;

  const [entities, setEntities] = useState<Person[] | undefined>(undefined);
  // const [searchTerm, setSearchTerm] = useState<string>("");


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
    getAllPeople()
      .then(entities => setEntities(entities));
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
                  <Link className="navitem" to="/Person/new/edit">
                      <Button variant="primary" className="mb-3">
                          Add Person
                      </Button>
                  </Link>
              </div>
            }
        </div>
        
        {entities !== undefined ?
        (
          <div>
            <Accordion defaultActiveKey={"people"}>
                <Accordion.Item key={"people"} eventKey={"people"}>
                        <Accordion.Header>{"People"}</Accordion.Header>
                        <Accordion.Body>
                          {
                          entities.length > 0 ? 
                          <div>
                            <Table striped hover responsive>
                              <thead>
                                  <tr>
                                      <th>Name</th>
                                      <th></th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {entities.map((_entity: Person) => {

                                    return (
                                      <tr key={_entity.id}>
                                          <td>{_entity.name}</td>
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

export default PeoplePage;