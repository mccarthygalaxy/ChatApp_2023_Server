import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Table, Row } from 'reactstrap';
import { baseURL } from '../environments'
import { useNavigate } from 'react-router-dom';
import MessageIndex from '../messages/MessageIndex';
import MessageAdd from '../messages/MessageAdd';
// import RoomEdit from './RoomEdit';

// const currentDate = new Date().toISOString();

function RoomTable(props) {

        // console.log(props.room);
            // let currentRoom_Id = '64ea30f18a162f7aa6449965'
    console.log('props to RoomTable: ', props)
    const [ messages, setMessages ] = useState([]);
    const [tokenPresent, setTokenPresent] = useState(false);

    const navigate = useNavigate();



    const fetchMessages = async () => {
        console.log('hit')
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
  
            console.log(data)
            setMessages(data)
            console.log(messages)
           
          
           
  
        } catch (err) {
            console.error(err.message)
        }
    }
    // useEffect(() => {
    //     console.log('Messages updated:', messages);
    // }, [messages]);

  
    useEffect(() => {
        if (props.token) {
            setTokenPresent(true);
        }
    }, [props.token]);

    console.log('RoomTable tokenPresent: ', tokenPresent)

   


    useEffect(() => {
        if(props.selectedRoom) {
          console.log('RoomTable Inside useEffect if tokenPresent')
            fetchMessages()
            // getUser()
           
        }
       
    }, [props.selectedRoom])
        console.log(props.rooms);






        

        async function deleteRoom(id) {
            const url = `${baseURL}/room/${id}`
            // console.log(id);
            // console.log(url);
            
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
    
            // console.log(data);
            if(data) {
                props.fetchRooms();
            }
        }

        async function editRoom(id) {
            const url = `${baseURL}/room/${id}`
            // console.log(id);
            // console.log(url);
            
            let requestOption = {
                headers: new Headers({
                    'Authorization': props.token,
                }),
                method: 'PATCH'
            }

            try {
            
            } catch (err) {
                console.error(err.message)
            }
            
            let res = await fetch(url, requestOption);
            let data = await res.json();
    
            // console.log(data);
            if(data) {
                props.fetchRooms();
            }
        }

        return (
            <>
                <h2>Chat Rooms</h2>
    
                <Container>
                    <Row>
                        <Col>
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
                                                    // onClick={
                                                    //     () => editRoom(props.selectedRoom._id)
                                                    // }
                                                >Edit</Button>
                                                <Button
                                                    // onClick={
                                                    //     () => deleteRoom(props.selectedRoom._id)
                                                    // }
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

                                {/* <tbody>
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
                                                    //     <RoomEdit
                                                    //         token={props.token}
                                                    //         fetchRooms={props.fetchRooms}
                                                    //         room_Id={room._id}
                                                    //     />
                                                    // }
                                                    //     // () => 
                                                    //     // editRoom(props.selectedRoom._id)
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
                                </tbody> */}
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
                            // username={currentUsername}
                            fetchMessages={fetchMessages}
                            room_Id={props.rooms[0]}
                            // owner_Id={}
                            token={props.token}
                            />
                        </Col>


                        {/* <Col>
                            <Table hover responsive bordered striped>
                            <thead>
                                <tr>
                                <th>User Name</th>
                                <th>Message</th>
                                <th>Time</th>
                                </tr>
                            </thead>
                                <tbody>
                                    {props.selectedRoom &&
                                        props.selectedRoom.messages.map(message => (
                                            <tr key={message._id}>
                                                <td>{message.ownerName}</td>
                                                <td>{message.text}</td>
                                                <td>{message.date}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </Table>
                        </Col> */}

                    </Row>
                </Container>
            </>
        );
    }
    
    export default RoomTable;