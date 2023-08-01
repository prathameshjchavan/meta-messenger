"use client";

import { Message as MessageType } from "@/typings";
import fetcher from "@/utils/fetchMessages";
import useSWR from "swr";
import Message from "./Message";
import { useEffect } from "react";
import { clientPusher } from "@/pusher";

const MessageList = () => {
	const {
		data: messages,
		error,
		mutate,
	} = useSWR<MessageType[]>("/api/getMessages", fetcher);

	useEffect(() => {
		const channel = clientPusher.subscribe("messages");

		channel.bind("new-message", async (data: Message) => {
			if (messages?.find((message) => message.id === data.id)) return;

			if (!messages) {
				mutate(fetcher);
			} else {
				mutate(fetcher, {
					optimisticData: [data, ...messages!],
					rollbackOnError: true,
				});
			}
		});

		return () => {
			channel.unbind_all();
			channel.unsubscribe();
		};
	}, [messages, mutate, clientPusher]);

	return (
		<div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
			{messages?.map((message) => (
				<Message key={message.id} message={message} />
			))}
		</div>
	);
};

export default MessageList;
