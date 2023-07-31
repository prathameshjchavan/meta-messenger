import ChatInput from "@/components/ChatInput";
import MessageList from "@/components/MessageList";

export default function Home() {
	return (
		<main className="">
			{/* Message List */}
			<MessageList />

			{/* Chat Input */}
			<ChatInput />
		</main>
	);
}
