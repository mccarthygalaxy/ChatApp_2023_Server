import React, { useEffect, useState } from 'react'
import RoomCreate from './RoomCreate';
import RoomEdit from './RoomEdit';
import { Col, Container, Row } from 'reactstrap';
import RoomTable from './RoomTable';
import { baseURL } from '../environments'

console.log(baseURL);

function RoomIndex(props) {

    const [ rooms, setRooms ] = useState([]);
    const [ selectedRoom, setSelectedRoom ] = useState(null);


    const fetchRooms = async () => {
        const url = `${baseURL}/room`;

        const requestOption = {
            method: 'GET',
            headers: new Headers({
                "Authorization": props.token
            })
        }

        try {
            
            const res = await fetch(url, requestOption);
            const data = await res.json();

            console.log(data);
            setRooms(data.getAllRooms)

        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        if(props.token)
        fetchRooms();
    }, [props.token]);
    
    return (
        <>  

            <Container>

                <Row>
                        <Col md="12">
                            <RoomTable
                                rooms={rooms}
                                token={props.token}
                                fetchRooms={fetchRooms}
                                selectedRoom={selectedRoom}
                                setSelectedRoom={setSelectedRoom}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <RoomCreate
                                token={props.token}
                                fetchRooms={fetchRooms}
                            />
                        </Col>
                    </Row>
                <br/>
                    {/* <Row>
                        <Col>
                            <RoomEdit
                                token={props.token}
                                fetchRooms={fetchRooms}
                            />
                        </Col>
                    </Row> */}

            </Container>
        </>
    )
}

export default RoomIndex