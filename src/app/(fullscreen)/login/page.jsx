import Heading from "@/components/typography/heading";
import { spotifyButton } from "@/components/typography/link";
import Link from "next/link";
import { FaSpotify } from "react-icons/fa";

export default function LoginPage() {
	return (
		<>
			<Heading level={3}>Log in</Heading>
			<div className="min-h-[30rem] items-center flex justify-center">
				<Link href={
					`https://accounts.spotify.com/authorize?`
					+ `response_type=code`
					+ `&client_id=${process.env.CLIENT_ID}`
					+ `&scope=user-read-private%20user-read-email`
					+ `&redirect_uri=${process.env.CALLBACK_URL}`
				} className={spotifyButton}>Log in with <FaSpotify className="text-white" /></Link>
			</div>
		</>
	);
}