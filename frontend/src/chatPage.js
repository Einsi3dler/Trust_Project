import ConversationPage from './components/conversationPage/Conversation';
import { useLocation } from 'react-router-dom';

export default function ChatPage () {
	const { state } = useLocation()
	const user = state.logUserData
	return (
		<>
		<ConversationPage  user={user}/>
		</>
	)

}