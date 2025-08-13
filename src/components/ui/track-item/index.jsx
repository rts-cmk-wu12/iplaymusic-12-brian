import { msToTime } from "@/utils/time";
import { FaPlay } from "react-icons/fa";

export default function TrackItem({ track }) {
	return (
		<article className="p-2 grid grid-cols-[2rem_auto_3rem] gap-4 items-center">
			<div className="bg-orange rounded-full h-8 w-8 flex items-center justify-center">
				<FaPlay className="text-white" />
			</div>
			<div className="flex flex-col">
				<span className="font-bold">{track.name}</span>
				<span className="font-light">{track.artists.map(artist => artist.name)}</span>
			</div>
			<span className="font-light text-right">{msToTime(track.duration_ms)}</span>
		</article>
	);
}