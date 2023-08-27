import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import FullButton from '../buttons/FullButton';
import { baseURL } from '../environments'


function MessageUpdate(props) {
    
    const { id } = useParams();

    const url = `${baseURL}/message/${id}`;

    let originalText = ''

    const [ text, setText ] = useState('');

    const navigate = useNavigate();
  
    

   

   


    const fetchMessage = async () => {
      
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: new Headers({
            "Authorization": props.token
          })
        });

        const data = await res.json();

        console.log(data);
        const text = data.getMessage;
        originalText = text
        setText(text)
    

      } catch (err) {
        console.error(err.message)
      }

    }
    async function handleSubmit(e) {
        e.preventDefault();

        // console.log(title)
        let body = JSON.stringify({
          text: text,
         
        })
        const requestOptions = {
          headers: new Headers({
            "Authorization": props.token,
            "Content-Type": 'application/json'
          }),
          body: body,
          method: "PATCH"
        }

        try {
          const res = await fetch(url, requestOptions);
          const data = await res.json();

          console.log(data);


        } catch (err) {
          console.error(err);
        }
    }


    useEffect(() => {
      if(props.token) {
        fetchMessage();
      }

    }, [props.token])

    return (
        <>
            <h1
                style={{textAlign: 'center', textDecoration: 'underline'}}
            >Edit Message</h1>
            <Container>
                <Row>
                    <Col md='4'>
                        <p>
                          <b>{originalText}</b>
                          <br />
                          When you're happy with your new message, press the button to change.
                          </p>
                          <FullButton>
                            <Button
                            color='info'
                            outline
                            onClick={() => navigate('/room')}>Back to Room</Button>
                          </FullButton>
                    </Col>
                    <Col md='8'>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label>Type New Message Here</Label>
                                <Input 
                            
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                />
                            </FormGroup>
                           
                            <FullButton>
                                <Button color='success'>Change</Button>
                            </FullButton>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default MessageUpdate