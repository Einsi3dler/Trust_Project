import { Container, Button } from "react-bootstrap";
import './conversation.css';


export default function ConversationPage ({ user }) {

	if (!user){
		return (
		<><h2>Please login to chat with your buyers and sellers</h2></>
		);
	}
	function renderConversation () {
		const conversation = user.conversations
		const conversationList = [];
		for (let i = 0; i < conversation.length; i++) {
		  conversationList.push(<section className="chattedUser">
			<div className="d-grid "><span> {conversation[i]} </span></div>
		</section>);
		}
		return conversationList;
	  };
	return (
		<>
		<Container fluid>
		<aside className="sidebar">
		<div className="search">
		<form action="">
			<input type="text" className="search-input bg-dark" placeholder=" Search"/>
		</form>
		</div>
		<section className="chattedUser">
			<div className="d-grid "><span> John</span></div>
			{renderConversation()}
		</section>
		</aside>
		<section >
			<div className="message-input-container">
        	<form action="">
          		<input class="message-input bg-dark" type="text" placeholder="Type a message..."/>
				<Button type="submit" className="btn btn-primary send-button">Send</Button>
        	</form>
      		</div>
		</section>
		</Container>
		</>
	)
}

