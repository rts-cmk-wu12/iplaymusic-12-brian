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
			<div className="grid grid-rows-2">
				<Image
					priority
					src={data.images[0].url}
					width={data.images[0].width}
					height={data.images[0].height}
					className="row-start-1 row-end-3 col-start-1 col-end-2"
					alt="" />
				<div className="row-start-1 row-end-3 col-start-1 col-end-2 bg-gradient-to-br from-gray-500 to-black opacity-50"></div>
				<div className="row-start-1 row-end-2 col-start-1 col-end-2 p-6">
					<Heading level={3} >{data.name}</Heading>
					<span className="text-white">{data.tracks.items.length} Songs</span>
				</div>
			</div>
			<ul>
				{data.tracks.items.map(track => <li key={track.id}><TrackItem track={track} /></li>)}
			</ul>
		</>
	);
}