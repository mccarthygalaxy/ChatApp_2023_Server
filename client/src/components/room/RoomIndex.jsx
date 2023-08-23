import React, { useEffect, useState } from 'react'
// import MovieCreate from './MovieCreate';
import { Col, Container, Row } from 'reactstrap';
import RoomTable from './RoomTable';
import { baseURL } from '../environments'

console.log(baseURL);

function RoomIndex(props) {

    // const [ movies, setMovies ] = useState([]);

    // const fetchMovies = async () => {
    //     const url = `${baseURL}/movies`;

    //     const requestOption = {
    //         method: 'GET',
    //         headers: new Headers({
    //             "Authorization": props.token
    //         })
    //     }

    //     try {
            
    //         const res = await fetch(url, requestOption);
    //         const data = await res.json();

    //         // console.log(data);
    //         setMovies(data.getAllMovies)

    //     } catch (err) {
    //         console.error(err.message)
    //     }
    // }
    
    //! fetchMovies(); Instead, look below in conditional:

    // useEffect(() => {
    //     if(props.token) {
    //         fetchMovies()
    //     }
    // }, [props.token])

    return (
        <>  

            <Container>

                <Row>
                    <Col>
                        {/* <h2>ADD A ROOM Placeholder</h2> */}
                        <RoomTable />
                    </Col>
                </Row>

                <Row>
                    {/* <Col md="4">
                        <MovieCreate
                            token={props.token}
                            fetchMovies={fetchMovies}
                        />
                    </Col> */}
                </Row>

            </Container>
        </>
    )
}

export default RoomIndex