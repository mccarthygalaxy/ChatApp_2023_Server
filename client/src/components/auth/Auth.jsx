import React, { useState } from 'react'
import Signup from './signup/Signup'
import Login from './login/Login';
import { Button, Col, Container, Row } from 'reactstrap';

function Auth(props) {

    const [ button, setButton ] = useState('Signup')

    const swapForm = () => {
        button === "Login" ? 
            setButton('Signup') :
            setButton('Login')
    }

    const displayForm = () => {
        return(
            button === "Login" ?
            <Row>
                <Col md="6">
                    <Signup 
                        updateToken={props.updateToken}
                    />
                </Col>
            </Row> :
            <Row>
                <Col md="6">
                    <Login 
                        updateToken={props.updateToken}
                    />
                </Col>
            </Row>
        
        )
    }

    return (
        <>
            <Button onClick={swapForm} color='dark'>{button}</Button>
            <Container>
                {displayForm()}
            </Container>
        </>
    )
}

export default Auth