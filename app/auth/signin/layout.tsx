import type { Metadata } from "next";
import { Fragment } from "react";

export const metadata: Metadata = {
	title: "Sign in to Messenger",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <Fragment>{children}</Fragment>;
}
