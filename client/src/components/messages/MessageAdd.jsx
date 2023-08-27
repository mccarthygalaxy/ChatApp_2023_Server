import React, { useRef } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import FullButton from '../buttons/FullButton';
import { baseURL } from '../environments';



function MessageAdd(props) {
  

    console.log(props.room_Id)

    const textRef = useRef();
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        const text = textRef.current.value;

        let body = JSON.stringify({
          text
        })

        let url = `${baseURL}/message/${props.room_Id._id}`;

        let headers = new Headers();
        headers.append(`Content-Type`, `application/json`);
        headers.append('Authorization', props.token)

        const requestOption = {
            headers: headers,
            body: body,
            method: 'POST'
        }

        try {
            const res = await fetch(url, requestOption);
            const data = await res.json();

            // console.log(data);
            props.fetchMessages();
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <>
            {/* <h3>New Message</h3> */}
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    {/* <Label></Label> */}
                    <Input 
                        name='text'
                        innerRef={textRef}
                        placeholder='Type New Message Here'
                    />
                </FormGroup>
                <FullButton>
                    <Button color='success'>Add Message</Button>
                </FullButton>
            </Form>
        </>
    )
}

export default MessageAdd