import React, { useEffect, useState } from "react";
import MessageDisplay from "./MessageDisplay";
import { baseURL } from "../environments";

function MessageIndex(props) {
  console.log('props to MessageIndex: ', props);

  useEffect(() => {
    if (props.token) {
      console.log("MessageIndex Inside useEffect if");
      props.fetchMessages();
    }
  }, [props.token])

  console.log(props.messages.results);
  return (
    <>
      <MessageDisplay
        token={props.token}
        fetchMessages={props.fetchMessages}
        messages={props.messages.results}
        rooms={props.rooms}
        selectedRoom={props.selectedRoom}
        setSelectedRoom={props.setSelectedRoom}
      />
    </>
  );
}

export default MessageIndex;