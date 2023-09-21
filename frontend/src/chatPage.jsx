import ConversationPage from './components/conversationPage/Conversation';

export default function ChatPage () {
	const user = JSON.parse(localStorage.getItem("loggedUser"));
	const receiver = JSON.parse(localStorage.getItem("receiver"));
	console.log(receiver)
	return (
		<>
		<ConversationPage  user={user} receiver={receiver}/>
		</>
	)

}