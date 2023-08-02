import ChatInput from "@/components/ChatInput";
import MessageList from "@/components/MessageList";
import { Message } from "@/typings";
import { getServerSession } from "next-auth/next";

export default async function Home() {
	const data = await fetch(
		`${process.env.VERCEL_URL || "http://localhost:3000"}/api/getMessages`,
		{ cache: "no-store" }
	).then((res) => res.json());
	const messages: Message[] = data.messages;
	const session = await getServerSession();

	return (
		<main>
			<MessageList initialMessages={messages} />
			<ChatInput session={session} />
		</main>
	);
}
