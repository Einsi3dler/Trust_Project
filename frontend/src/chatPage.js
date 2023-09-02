import ConversationPage from './components/conversationPage/Conversation';
import { useLocation } from 'react-router-dom';

export default function ChatPage () {
	const { state } = useLocation()
	console.log(state)
	return (
		<>
		<ConversationPage  user={state}/>
		</>
	)

}