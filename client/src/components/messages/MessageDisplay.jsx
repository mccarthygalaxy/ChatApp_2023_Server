import React, { useEffect } from "react";
import { Table, Button } from "reactstrap";
import { baseURL } from "../environments";
import { useNavigate } from "react-router-dom";

export default function MessageDisplay({token, messages, fetchMessages, rooms, selectedRoom, setSelectedRoom}) {

  console.log("MessageDisplay token :", token);
  console.log("MessageDisplay rooms :", rooms[0]._id);

  const navigate = useNavigate();

  async function deleteMessage(id) {
    const url = `${baseURL}/message/${id}`;

    let requestOption = {
      headers: new Headers({
        // Authorization: props.token,
        Authorization: token,
      }),
      method: "DELETE",
    };
    try {
      let res = await fetch(url, requestOption);
      let data = await res.json();

      if (data) {
        fetchMessages();
      }

    } catch (err) {
      console.err(err.message);
    }
  }

 

  useEffect(() => {
    if (token) {
      console.log("MessageDisplay Inside useEffect if");
      fetchMessages();
    }
  }, [token])

  console.log(messages)

  return (
    // Date Text Owner
    <>
      <h2>Messages</h2>
      <Table hover borderless dark>
   
        <tbody>
        {messages && messages.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Text</th>
              <th>Username</th>
              <th>Edit / Delete</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message._id}>
                <td>{message.date}</td>
                <td>{message.text}</td>
                <td>{message.username}</td>
                <td>
                  <Button
                    color="warning"
                    onClick={() => navigate(`/message/update/${message._id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteMessage(message._id)}
                    color="danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <tr>
        <h4>No messages to display.</h4>
        </tr>
      )}
        </tbody>
      </Table>
    </>
  );
}