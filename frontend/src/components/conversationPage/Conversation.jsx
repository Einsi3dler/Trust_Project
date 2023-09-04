import { Container } from "react-bootstrap";
import './conversation.css';
import axios from "axios";
import { socket } from "../../socket";
import { useState, useEffect, useMemo } from 'react';
import ConversationView from "./ConversationView";


export default function ConversationPage ({ user }) {



  const [spokenTo, setSpokenTo] = useState([])
  const [currentReceiver, setCurrentReceiver] = useState([])
  const userId = user.id
  const [incomingMessage, setIncomingMessage] = useState([]);
  const [currentChatMessage, setCurrentChatMessage] = useState([])


  useEffect(() => {
	socket.on('connect', ()=>{
		socket.emit('add_user', userId);
	} )
  })
  useEffect(() => {
    socket.on("receive_msg", (data) => {
		console.log(data)
	  setIncomingMessage([...incomingMessage, data]);
	})});
  useMemo(() => {
	setSpokenTo([]);
	const conversationApi = `http://localhost:5000/chat/${userId}/conversations`;
	axios.get(conversationApi)
	.then(response => {
	const conversation = response.data;
	const conversationList = [];
	conversation?.map(spokeTo => {
	const spokeToUser = spokeTo['first_name'] + " " + spokeTo['last_name'];
	const receiverId = spokeTo['id'];
	conversationList.push({ spokeToUser, receiverId, });
	return true
		})
	setSpokenTo(prevState => conversationList)
	})
	.catch(error => {
		console.log(error.response)
	})

	}, [userId]);

	if (!user){
		return (
		<><h2>Please login to chat with your buyers and sellers</h2></>
		);
	}


	function startConversation (receiver_id) {
		setCurrentReceiver(receiver_id)
		incomingMessage?.map((msg) => {
			console.log("my message")
			console.log(msg)
			if (msg.receiver_id === receiver_id) {
				setCurrentChatMessage([...currentChatMessage, msg]);
			}
			return true;
		})
	}




	return (
		<>
		<Container fluid >
		<aside className="sidebar">
		<div className="search">
		<form action="">
			<input type="text" className="search-input bg-dark" placeholder=" Search"/>
		</form>
		</div>
		{spokenTo?.map((el, index) =>
		<section className="chattedUser" key={index} onClick={ () => startConversation(el.receiverId) } id={el.receiverId}>
		<div className="d-grid text-left" ><span> {el.spokeToUser}</span></div>
		</section>
		)}
		</aside>
		<div className="bg-primary">
		<section className="" >
			<div className="message-input-container ">
			<ConversationView  userId={ user.id} receiverId={currentReceiver} msg_data={currentChatMessage}>
			</ConversationView>
      		</div>
		</section>
		</div>
		</Container>
		</>
	)
}
