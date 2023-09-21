/* eslint-disable react/prop-types */
import { socket } from "../../socket";
import { useState, useEffect } from "react";
import PersonLogo from "./person-circle.svg";
import { AiOutlineSend } from "react-icons/ai";
import axios from "axios";

export default function ConversationView({
  userId,
  receiverId,
  currentChatUserName = "You",
}) {
  const [value, setValue] = useState("");
  const [allMessage, setAllMessage] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState();
  const [sendMessage, setSendMessage] = useState();

  useEffect(() => {
    setAllMessage([]);
    clearText();
    const messagesApi = `http://web-01.olagoldhackxx.tech/chat/${userId}/${receiverId}/messages`;
    axios
      .get(messagesApi)
      .then((response) => {
        const message = response.data;
        setAllMessage(message);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [userId, receiverId]);

  useEffect(() => {
    socket.on("receive_msg", (data) => {
      setIncomingMessage(data);
    });
    if (incomingMessage) {
      setAllMessage((prevState) => [incomingMessage, ...prevState]);
    }
    if (sendMessage) {
      setAllMessage((prevState) => [sendMessage, ...prevState]);
    }
  }, [incomingMessage, sendMessage]);
  console.log(incomingMessage);
  console.log(sendMessage)

  function clearText() {
    let input = document.getElementById("text");
    // clear the input field.
    input.value = "";
  }
  function onSubmit(event) {
    event.preventDefault();
    clearText();
    socket
      .timeout(5000)
      .emit("send_msg", {
        message: value,
        sender_id: userId,
        receiver_id: receiverId,
      });
  }

  return (
    <>
      <nav className="navbar fixed-top view-navbar ">
        <div className="container-fluid">
          <img src={PersonLogo} className="" alt="profile logo" />
          <span className="navbar-brand user-name text-dark text-capitalize ">
            {currentChatUserName}
          </span>
        </div>
      </nav>
      <div
        className="msg-box container-fluid d-flex flex-column-reverse"
        id="msgbox"
      >
        {allMessage &&
          allMessage.map((item, index) => (
            <div
              key={index}
              className={`text-dark message d-flex
			  ${
          item.receiver_id === userId
            ? "justify-content-start"
            : "justify-content-end"
        }`}
            >
              <p
                className={`text-break ${
                  item.receiver_id === userId ? "text-start" : "text-end"
                } `}
              >
                {item.message}
              </p>
            </div>
          ))}
      </div>
      <div className="fixed-bottom">
        <form onSubmit={onSubmit}>
          <input
            onChange={(e) => setValue(e.target.value)}
            className="message-input overflow-auto"
            type="text"
            id="text"
            placeholder="Enter your message..."
            required
          />
          <input type="submit" value="Send" className="d-none" id="send" />
          <label htmlFor="send">
            <AiOutlineSend
              size={30}
              className="absolute ms-3 text-primary top-5 cursor-pointer"
              onClick={() => {
                setSendMessage({
                  message: value,
                  sender_id: userId,
                  receiver_id: receiverId,
                });
              }}
            />
          </label>
        </form>
      </div>
    </>
  );
}
