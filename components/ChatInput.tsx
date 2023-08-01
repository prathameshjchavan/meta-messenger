"use client";

import { Message } from "@/typings";
import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useSWR from "swr";
import fetcher from "@/utils/fetchMessages";

type Data = {
	message: Message;
};

const ChatInput = () => {
	const [input, setInput] = useState("");
	const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);
	console.log({ messages });

	const addMessage = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!input) return;

		const messageToSend = input;
		setInput("");

		const id = uuidv4();
		const message: Message = {
			id,
			message: messageToSend,
			username: "Prathamesh Chavan",
			profilePic:
				"https://media.licdn.com/dms/image/C5603AQEiRFiBvvQX_Q/profile-displayphoto-shrink_800_800/0/1648882577220?e=1696464000&v=beta&t=hU0ouQQicyNRHfQpLvhh3ZrC7Ndw4e2Geqwou9GFohI",
			email: "prathamesh.chavan216@gmail.com",
		};

		const uploadMessageToUpstash = async () => {
			const res = await fetch("/api/addMessage", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});

			const data: Data = await res.json();
			return [data.message, ...messages!];
		};

		await mutate(uploadMessageToUpstash);
	};

	return (
		<form
			onSubmit={addMessage}
			className="fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t border-gray-100"
		>
			<input
				className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-none px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
				placeholder="Enter a message..."
				value={input}
				onChange={(e) => setInput(e.target.value)}
				type="text"
				required
			/>
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
				type="submit"
				disabled={!input}
			>
				Send
			</button>
		</form>
	);
};

export default ChatInput;
