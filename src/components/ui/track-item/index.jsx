"use client";

import { msToTime } from "@/utils/time";
import { FaPlay } from "react-icons/fa";
import MarqueeText from "../marquee-text";
import { useContext } from "react";
import { playerContext } from "@/providers/player-provider";

export default function TrackItem({ track, albumCover }) {
	const { setShowPlayer, setCurrentTrack, setAlbumCover } = useContext(playerContext);

	async function clickHandler(event) {
		setShowPlayer(true);
		setCurrentTrack(track);
		setAlbumCover(() => albumCover);
	}

	return (
		<button onClick={clickHandler}>
			<article className="p-2 grid grid-cols-[2rem_auto_3rem] gap-4 items-center">
				<span className="bg-linear-to-br from-pink to-orange rounded-full h-8 w-8 pl-[2px] flex items-center justify-center">
					<FaPlay className="text-white" />
				</span>
				<div className="flex flex-col">
					<MarqueeText name={track.name} className="font-bold" />
					<MarqueeText name={track.artists.map(artist => artist.name)} className="font-light" />
				</div>
				<span className="font-light text-right">{msToTime(track.duration_ms)}</span>
			</article>
		</button>
	);
}