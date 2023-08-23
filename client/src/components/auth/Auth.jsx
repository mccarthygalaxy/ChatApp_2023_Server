import React, { useState } from 'react'
import Signup from './signup/Signup'
import Login from './login/Login';
import { Button, Col, Container, Row } from 'reactstrap';

function Auth(props) {

    const [ button, setButton ] = useState('Signup')

    /* if button value is 'Login' set it to 'Signup' (when clicked)
        and vice-versa (ternary): */
    const swapForm = () => {
        button === "Login" ? 
            setButton('Signup') :
            setButton('Login')
    }

        /* if button value is 'Login' display 'Signup' content;
            if button value is 'Signup' display 'Login' content (ternary): */
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
            <Container>
                {displayForm()}
                <Row>
                    <Col sm="6">
                        <Button onClick={swapForm} color='warning'>{button}</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Auth