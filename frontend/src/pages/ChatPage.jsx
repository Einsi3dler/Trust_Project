import ConversationPage from '../components/conversationPage/Conversation';

export default function ChatPage () {
	const user = JSON.parse(localStorage.getItem("loggedUser"));
	return (
		<>
		<ConversationPage  user={user}/>
		</>
	)

}