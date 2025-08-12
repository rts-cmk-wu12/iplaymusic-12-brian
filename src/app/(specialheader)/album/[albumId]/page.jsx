import Heading from "@/components/typography/heading";
import TrackItem from "@/components/ui/track-item";
import { cookies } from "next/headers";
import Image from "next/image";

export async function generateMetadata({ params }) {
	const { albumId } = await params;
	const cookieStore = await cookies();

	const access_token = cookieStore.get("ipm_access_token");

	const response = await fetch("https://api.spotify.com/v1/albums/" + albumId, {
		headers: {
			Authorization: "Bearer " + access_token.value
		}
	});

	const data = await response.json();

	return {
		title: data.name
	}
}

export default async function AlbumDetailPage({ params }) {
	const { albumId } = await params;
	const cookieStore = await cookies();

	const access_token = cookieStore.get("ipm_access_token");

	const response = await fetch("https://api.spotify.com/v1/albums/" + albumId, {
		headers: {
			"Authorization": `Bearer ${access_token.value}`
		}
	});

	const data = await response.json();


	return (
		<>
			<Heading level={2}>{data.name}</Heading>
			<Image src={data.images[0].url} width={data.images[0].width} height={data.images[0].height} alt="" />
			<ul>
				{data.tracks.items.map(track => <li key={track.id}><TrackItem track={track} /></li>)}
			</ul>
		</>
	);
}