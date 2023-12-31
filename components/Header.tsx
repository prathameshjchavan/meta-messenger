import Image from "next/image";
import LogoutButton from "./LogoutButton";
import Link from "next/link";
import { getServerSession } from "next-auth";

const Header = async () => {
	const session = await getServerSession();

	if (session)
		return (
			<header className="sticky top-0 z-50 bg-white flex items-center p-10 shadow-sm justify-between">
				<div className="flex space-x-2 items-center">
					<Image
						className="rounded-full mx-2 object-contain"
						height={10}
						width={50}
						src="https://links.papareact.com/jne"
						alt="Profile Picture"
					/>

					<div>
						<p className="text-blue-400">Logged in as:</p>
						<p className="font-bold text-lg">Prathamesh Chavan</p>
					</div>
				</div>

				<LogoutButton />
			</header>
		);

	return (
		<header className="sticky top-0 z-50 bg-white flex justify-center items-center p-10 shadow-sm">
			<div className="flex flex-col items-center space-y-5">
				<div className="flex space-x-2 items-center">
					<Image
						src="https://links.papareact.com/jne"
						alt="logo"
						height={10}
						width={50}
					/>

					<p className="text-blue-400">Welcome to Meta Messenger</p>
				</div>

				<Link
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					href="/auth/signin"
				>
					Sign In
				</Link>
			</div>
		</header>
	);
};

export default Header;
