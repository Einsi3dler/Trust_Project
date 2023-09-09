import ConversationView from "./ConversationView";
import { useLocation } from "react-router-dom";
import './conversation.css';


export default function ResponsiveChatView () {
	const { state } = useLocation()
	const user = state
	console.log(user)
	return (

		<ConversationView  userId={ user.userId} receiverId={user.receiverId} currentChatUserName={user.currentChatUserName}>
			</ConversationView>

	)

}