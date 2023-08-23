import React, { useRef } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import FullButton from '../../buttons/FullButton';
import { useNavigate } from 'react-router-dom';

function Signup(props) {

    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        // console.log(username, email, password)

        let body = JSON.stringify({
            username: username, 
            email: email, 
            password: password
        })

        console.log(body)

        const url = `http://127.0.0.1:4005/user/signup`;

    try {

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: body

        });

        const data = await res.json();

        if(data.message === "Success!") {
            props.updateToken(data.token)
            navigate('/rooms');
        } else {
            alert(data.message)
        }

    } catch (err) {
        console.error(err.message);
    }
}

    return (
        <>
        <h2>Signup</h2>
        <Form onSubmit={handleSubmit}>
            <FormGroup floating>
            <Input
                id="newUsername"
                name="username"
                placeholder="Username"
                type="text"
                innerRef={usernameRef}
            />
            <Label for="newUsername">Username</Label>
            </FormGroup>{" "}
            <FormGroup floating>
            <Input
                id="newEmail"
                name="email"
                placeholder="Email"
                type="email"
                innerRef={emailRef}
            />
            <Label for="newEmail">Email</Label>
            </FormGroup>{" "}
            <FormGroup floating>
            <Input
                id="newPassword"
                name="password"
                placeholder="Password"
                type="password"
                innerRef={passwordRef}
            />
            <Label for="newPassword">Password</Label>
            </FormGroup>{" "}

            <FullButton>
                    <Button color="primary" type='submit'>Signup</Button>
                </FullButton>
        </Form>
        </>
    );
}
export default Signup