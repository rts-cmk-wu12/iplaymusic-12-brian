import { FaPlay } from "react-icons/fa";

export default function TrackItem({ track }) {
	return (
		<article className="flex justify-between">
			<FaPlay />
			<div className="flex flex-col">
				<span>{track.name}</span>
				<span>{track.artists.map(artist => artist.name)}</span>
			</div>
			<span>{track.duration_ms}</span>
		</article>
	)
}