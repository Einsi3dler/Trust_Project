/* eslint-disable react/prop-types */
import { Container } from "react-bootstrap";
import "./conversation.css";
import axios from "axios";
import { socket } from "../../socket";
import { useState, useEffect, useMemo } from "react";
import ConversationView from "./ConversationView";
import PersonLogo from "./person-circle.svg";
import { Navbar, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ConversationPage({ user }) {
  const [show, setShow] = useState(false);
  const [spokenTo, setSpokenTo] = useState([]);
  const [currentReceiver, setCurrentReceiver] = useState(null);
  const userId = user.id;
  const [currentChatId, setCurrentChatId] = useState();
  const [currentChatUsername, setCurrentChatUsername] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("add_user", userId);
    });
    setCurrentChatId(userId);
  }, [userId]);
  useMemo(() => {
    setSpokenTo([]);
    const conversationApi = `http://localhost:5000/chat/${userId}/conversations`;
    axios
      .get(conversationApi)
      .then((response) => {
        const conversation = response.data;
        const conversationList = [];
        conversation?.map((spokeTo) => {
          const spokeToUserFirstName = spokeTo.chat_user["first_name"];
          const spokeToUserLastName = spokeTo.chat_user["last_name"];
          const receiverId = spokeTo.id;
          const message = spokeTo.message;
          conversationList.push({
            message,
            spokeToUserFirstName,
            spokeToUserLastName,
            receiverId,
          });
          return true;
        });
        setSpokenTo(conversationList);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [userId]);

  if (!user) {
    return (
      <>
        <h2>Please login to chat with your buyers and sellers</h2>
      </>
    );
  }

  function startConversation(
    event,
    receiver_id,
    chatUserFirstName,
    chatUserLastName = ""
  ) {
    event.preventDefault();
    const chat = document.getElementById(receiver_id);
    if (currentChatId) {
      const chattedUser = document.getElementById(currentChatId);
      chattedUser.style.borderBottomColor = "silver";
    }
    chat.style.borderBottomColor = `var(--bs-primary)`;
    setCurrentChatId(receiver_id);
    setCurrentReceiver(receiver_id);
    setCurrentChatUsername(chatUserFirstName + " " + chatUserLastName);
    const responsivePage = document.getElementById("pageresponsive");
    const check = window
      .getComputedStyle(responsivePage)
      .getPropertyValue("display");
    if (check === "none" && currentReceiver) {
      navigate("/responsive", {
        state: {
          userId: user.id,
          receiverId: currentReceiver,
          currentChatUserName: currentChatUsername,
        },
      });
    }
  }
  console.log(currentReceiver);

  return (
    <>
      <Container fluid className="d-flex overflow-hidden msg-container">
        <aside className="sidebar fixed">
          <nav className="navbar chatbar ">
            <div className="container-fluid">
              <img src={PersonLogo} className="" alt="profile logo" />
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                onClick={handleShow}
                className="m-1"
              />
              <Offcanvas
                show={show}
                onHide={handleClose}
                id="basic-navbar-nav"
                aria-labelledby="navbar-label"
                placement="start"
				className="popover"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id="navbar-label"> <div className="logo"></div></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <div
                    className="chat-menu flex-grow-1 pe-3"
                    id="nav-menu"
                  >
                    <ul>
                      <li>
                        <a href="/">Dashboard</a>
                      </li>
                      <li>
                        <a href="/">Transactions</a>
                      </li>
                      <li>
                        <a href="/">Buyers</a>
                      </li>
                      <li>
                        <a href="/">Sellers</a>
                      </li>
                      <li>
                        <a href="/">Accounts Setting</a>
                      </li>
                      <li className="chat-logout">
                        <button className=" btn btn-primary col-4">
                          <a href="/logout">Log out</a>
                        </button>
                      </li>
                    </ul>
                  </div>
                </Offcanvas.Body>
              </Offcanvas>
            </div>
          </nav>
          <div className="search">
            <form action="">
              <input
                type="text"
                className="search-input bg-dark"
                placeholder=" Search messages"
              />
            </form>
          </div>
          {spokenTo?.map((el, index) => (
            <section
              className="chattedUser d-flex"
              key={index}
              onClick={(e) =>
                startConversation(
                  e,
                  el.receiverId,
                  el.spokeToUserFirstName,
                  el.spokeToUserLastName
                )
              }
              id={el.receiverId}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
              <p className="user-name text-capitalize text-start">
                {el.spokeToUserFirstName} {el.spokeToUserLastName}{" "}
              </p>
            </section>
          ))}
        </aside>
        <main className="view d-none d-md-block" id="pageresponsive">
          <ConversationView
            userId={user.id}
            receiverId={currentReceiver}
            currentChatUserName={currentChatUsername}
          ></ConversationView>
        </main>
      </Container>
    </>
  );
}
