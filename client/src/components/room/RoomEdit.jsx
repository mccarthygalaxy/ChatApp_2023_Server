import React, { useState, useRef } from 'react';
import { Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FullButton from '../buttons/FullButton';
import { baseURL } from '../environments';

function RoomEdit(props) {

    console.log(props);

    const titleRef = useRef();
    const descriptionRef = useRef();

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    // const messagesRef = useRef();
    const owner_IdRef = props.user_Id;

    // const ownerNameRef = props.user.name;


    const handleSubmit = async (e) => {
        e.preventDefault();

        const title = titleRef.current.value;
        console.log(titleRef.current.value);

        const description = descriptionRef.current.value;
        console.log(descriptionRef.current.value);


        // const messages  = messagesRef.current.value;

        // const owner_Id  = owner_IdRef.current.value;
        // console.log(owner_IdRef.current.value);

        // const ownerName  = ownerNameRef.current.value;


        let body = JSON.stringify({
            title, 
            description, 
            // owner_Id, 
            // ownerName
        })

        let url = `${baseURL}/room/`;

        let headers = new Headers();
        headers.append(`Content-Type`, `application/json`);
        headers.append('Authorization', props.token)

        const requestOption = {
            headers: headers,
            body: body,
            method: 'PATCH'
        }

        try {
            const res = await fetch(url, requestOption);
            const data = await res.json();

            console.log(data);
            props.fetchRooms();
            
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
    <>
        <div>
        <Button color="danger" onClick={toggle}>
            Edit Room
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader>Edit Chat Room</ModalHeader>
                <ModalBody>
                    <h1>Edit Room</h1>
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
                    <Button type='submit' color="success" onClick={toggle}>Update</Button>
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

export default RoomEdit