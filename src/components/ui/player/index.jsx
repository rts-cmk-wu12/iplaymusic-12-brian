"use client";

import { playerContext } from "@/providers/player-provider";
import { useContext, useEffect } from "react";

export default function Player() {
	const { showPlayer, currentTrack } = useContext(playerContext);

	useEffect(function () {
		console.log("currentTrack", currentTrack);
	}, [currentTrack]);

	return showPlayer ? (
		<section className="bg-linear-to-br from-pink to-orange w-[90%] h-24 z-100 fixed bottom-20 mx-[5%] rounded-md">
			<p>{currentTrack.name}</p>
		</section>
	) : null;
}