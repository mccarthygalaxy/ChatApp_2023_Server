import React, { useState, useRef } from 'react';
import { Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FullButton from '../buttons/FullButton';
import { baseURL } from '../environments';

function RoomCreate(props) {

    const titleRef = useRef();
    const descriptionRef = useRef();

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const title = titleRef.current.value;

        const description = descriptionRef.current.value;


        let body = JSON.stringify({
            title, 
            description, 
        })

        let url = `${baseURL}/room/createRoom`;

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

            props.fetchRooms();
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
    <>
        <div>
        <Button color="danger" onClick={toggle}>
            Create New Room
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader>New Chat Room</ModalHeader>
                <ModalBody>
                    <h1>Create Room</h1>
                    <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label>Title</Label>
                        <Input 
                            name="roomTitle" 
                            innerRef={titleRef} 
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Description</Label>
                        <Input 
                            name="roomDescription" 
                            innerRef={descriptionRef} 
                        />
                    </FormGroup>

                    <FullButton>
                    <Button type='submit' color="success" onClick={toggle}>Create</Button>
                    </FullButton>{" "}
                </Form>
                </ModalBody>
            <ModalFooter>
                {/* <Button color="primary" onClick={toggle}>
                Create
                </Button>{" "} */}
                <Button color="secondary" onClick={toggle}>
                Cancel
                </Button>
            </ModalFooter>
        </Modal>
        </div>
    </>
    );
}

export default RoomCreate