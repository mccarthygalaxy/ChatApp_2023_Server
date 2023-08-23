import React from 'react';
import { Col, Container, Table, Row } from 'reactstrap';

const currentDate = new Date().toISOString();

function RoomTable() {
    return (
        <>
        <h2>Chat Rooms</h2>

        <Container>
            <Row>
            <Col md="3">
                <Table
                dark
                className="table-info"
                hover
                responsive
                bordered
                // striped
                size="sm"
                >
                <thead>
                    <tr>
                    <th colSpan={2}>Rooms</th>
                    </tr>
                </thead>
                <thead>
                    <tr>
                    <th>Room Name</th>
                    <th>Last Post (time)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>Room 1</td>
                    <td>{currentDate}</td>
                    </tr>
                    <tr>
                    <td>Room 2</td>
                    <td>{currentDate}</td>
                    </tr>
                    <tr>
                    <td>Room 3</td>
                    <td>{currentDate}</td>
                    </tr>
                    <tr>
                    <td>Room 4</td>
                    <td>{currentDate}</td>
                    </tr>
                    <tr>
                    <td>The Tower</td>
                    <td>{currentDate}</td>
                    </tr>
                    <tr>
                    <td>Minneapolis</td>
                    <td>{currentDate}</td>
                    </tr>
                </tbody>
                </Table>
            </Col>

            <Col md="9">
                <Table
                // className='table-success'
                hover
                responsive
                bordered
                striped
                // size='sm'
                >
                <thead>
                    <tr>
                    <th>User Name</th>
                    <th>Message</th>
                    <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>User 1</td>
                    <td>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Aperiam, at?
                    </td>
                    <td>{currentDate}</td>
                    </tr>
                    <tr>
                    <td>User 2</td>
                    <td>Lorem ipsum, dolor sit amet consectetur adipisicing.</td>
                    <td>{currentDate}</td>
                    </tr>
                    <tr>
                    <td>User 1</td>
                    <td>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Deleniti.
                    </td>
                    <td>{currentDate}</td>
                    </tr>
                    <tr>
                    <td>User 2</td>
                    <td>Lorem ipsum dolor sit amet.</td>
                    <td>{currentDate}</td>
                    </tr>
                    <tr>
                    <td>User 3</td>
                    <td>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                        Iste soluta adipisci laboriosam.
                    </td>
                    <td>{currentDate}</td>
                    </tr>
                </tbody>
                </Table>
            </Col>
            </Row>
        </Container>
    </>
    );
}

export default RoomTable