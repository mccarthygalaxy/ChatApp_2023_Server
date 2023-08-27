import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Table, Row } from 'reactstrap';
import { baseURL } from '../environments'
import { useNavigate } from 'react-router-dom';
import MessageIndex from '../messages/MessageIndex';
import MessageAdd from '../messages/MessageAdd';

function RoomTable(props) {

    const [ messages, setMessages ] = useState([]);
    const [tokenPresent, setTokenPresent] = useState(false);

    const navigate = useNavigate();

    const fetchMessages = async () => {
    
        const url = `${baseURL}/message/${props.selectedRoom._id}`;

        const requestOption = {
            method: 'GET',
            headers: new Headers({
                "Authorization": props.token
            })
        }

        try {
            
            const res = await fetch(url, requestOption);
            const data = await res.json();

            setMessages(data)

        } catch (err) {
            console.error(err.message)
        }

    }

    useEffect(() => {
        if (props.token) {
            setTokenPresent(true);
        }
    }, [props.token]);


    useEffect(() => {
        if(props.selectedRoom) {

            fetchMessages()

        }

    }, [props.selectedRoom])

        async function deleteRoom(id) {
            const url = `${baseURL}/room/${id}`
            
            let requestOption = {
                headers: new Headers({
                    'Authorization': props.token,
                }),
                method: 'DELETE'
            }

            try {
            
            } catch (err) {
                console.error(err.message)
            }
            
            let res = await fetch(url, requestOption);
            let data = await res.json();
    
            if(data) {
                props.fetchRooms();
            }
        }

        return (
            <>
                <h2>Chat Rooms</h2>
    
                <Container>
                    <Row>

                        <Col md="4">
                            <Table dark className="table-info" hover responsive bordered size="sm">
                            <thead>
                                <tr>
                                <th colSpan={3}>Rooms</th>
                                </tr>
                            </thead>
                            <thead>
                                <tr>
                                <th>Room Name</th>
                                <th>Room Description</th>
                                <th>Room Manage</th>
                                </tr>
                            </thead>
                            {props.rooms && props.rooms.length > 0 ? (
                                <tbody>

                                    {props.rooms.map(room => (
                                        <tr
                                            key={room._id}
                                            onClick={() => props.setSelectedRoom(room)} // Pass setSelectedRoom here
                                        >
                                            <td>{room.title}</td>
                                            <td>{room.description}</td>
                                            <td>
                                            <Button
                                                    color='warning'
                                                    onClick={ () =>
                                                        navigate(`/room/update/${room._id}`)}
                                                >Edit</Button>
                                            <Button
                                                onClick={
                                                    () => deleteRoom(props.selectedRoom._id)
                                                }
                                                color='danger'
                                            >Delete</Button>
                                                </td>
                                        </tr>
                                    ))}
                                </tbody>
                                ) : (
                                <tr>
                                <h4>No Rooms to display.</h4>
                                </tr>
                                )}
                            </Table>
                        </Col>
                
                        <Col>
                                <MessageIndex
                                    token={props.token}
                                    fetchMessages={fetchMessages}
                                    messages={messages}
                                    rooms={props.rooms}
                                    selectedRoom={props.selectedRoom}
                                    setSelectedRoom={props.setSelectedRoom}
                                />
                                <MessageAdd 
                                    fetchMessages={fetchMessages}
                                    room_Id={props.selectedRoom}
                                    // username={currentUsername}
                                    // owner_Id={}
                                    token={props.token}
                                />
                        </Col>

                    </Row>
                </Container>
            </>
        );
    }
    
    export default RoomTable;