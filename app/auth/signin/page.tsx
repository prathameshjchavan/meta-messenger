import SignIn from "@/components/SignIn";
import { getProviders } from "next-auth/react";
import Image from "next/image";

const SignInPage = async () => {
	const providers = await getProviders();

	return (
		<div className="grid justify-center">
			<div>
				<Image
					src="https://links.papareact.com/161"
					className="rounded-full mx-2 object-cover"
					width={700}
					height={700}
					alt="Profile Picture"
				/>
			</div>

			<SignIn providers={providers} />
		</div>
	);
};

export default SignInPage;
