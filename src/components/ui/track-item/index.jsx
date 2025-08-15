import { msToTime } from "@/utils/time";
import { FaPlay } from "react-icons/fa";
import MarqueeText from "../marquee-text";

export default function TrackItem({ track }) {
	return (
		<article className="p-2 grid grid-cols-[2rem_auto_3rem] gap-4 items-center">
			<button className="bg-linear-to-br from-pink to-orange rounded-full h-8 w-8 pl-[2px] flex items-center justify-center">
				<FaPlay className="text-white" />
			</button>
			<div className="flex flex-col">
				<MarqueeText name={track.name} className="font-bold" />
				<MarqueeText name={track.artists.map(artist => artist.name)} className="font-light" />
			</div>
			<span className="font-light text-right">{msToTime(track.duration_ms)}</span>
		</article>
	);
}