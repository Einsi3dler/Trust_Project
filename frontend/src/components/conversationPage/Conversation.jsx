import { Container, Button } from "react-bootstrap";
import './conversation.css';

export default function ConversationPage () {
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
		</section>
		</aside>
		<section >
			<div class="message-input-container">
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