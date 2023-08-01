import ChatInput from "@/components/ChatInput";
import MessageList from "@/components/MessageList";
import { Message } from "@/typings";

export default async function Home() {
	const data = await fetch(
		`${process.env.VERCEL_URL || "http://localhost:3000"}/api/getMessages`,
		{ cache: "no-store" }
	).then((res) => res.json());
	const messages: Message[] = data.messages;

	return (
		<main>
			<MessageList initialMessages={messages} />
			<ChatInput />
		</main>
	);
}
