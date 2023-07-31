import Image from "next/image";

const Header = () => {
	return (
		<header>
			<div>
				<div>
					<Image
						src="https://links.papareact.com/jne"
						alt="logo"
						height={10}
						width={50}
					/>
				</div>
			</div>
		</header>
	);
};

export default Header;
