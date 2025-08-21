"use client";

import { playerContext } from "@/providers/player-provider";
import { msToTime } from "@/utils/time";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

function useDebounce(value, delay = 300) {
	const [debounceValue, setDebounceValue] = useState(value);

	useEffect(function () {
		const timer = setTimeout(function () {
			setDebounceValue(value);
		}, delay);

		return () => clearTimeout(timer);
	}, [value, delay]);

	return debounceValue;
}

export default function Player() {
	const { showPlayer, currentTrack, albumCover } = useContext(playerContext);
	const controlRef = useRef();
	const [controller, setController] = useState();
	const [isPaused, setIsPaused] = useState(false);
	const [timing, setTiming] = useState({ duration: 0, position: 0 });
	const [localPosition, setLocalPosition] = useState(0);
	const [isSeeking, setIsSeeking] = useState(false);
	const debouncedPosition = useDebounce(localPosition);

	useEffect(function () {
		if (!isSeeking) {
			setLocalPosition(timing.position);
		}
	}, [timing.position, isSeeking]);

	useEffect(function () {
		if (isSeeking && debouncedPosition !== timing.position) {
			controller.seek(Math.floor(debouncedPosition / 1000));
			setIsSeeking(false);
		}
	}, [debouncedPosition, timing.position]);

	useEffect(function () {
		window.onSpotifyIframeApiReady = function (IFrameAPI) {
			const options = {
				uri: currentTrack.uri,
				width: 0,
				height: 0,
			};
			const callback = (EmbedController) => {
				EmbedController.play();
				setController(EmbedController);
				EmbedController.addListener("playback_update", function (event) {
					setTiming(() => { return { duration: event.data.duration, position: event.data.position } });
					if (event.data.isPaused) setIsPaused(true);
					else setIsPaused(false);
				});
			};
			IFrameAPI.createController(controlRef.current, options, callback);

		};
	}, [currentTrack]);

	function changeHandler(event) {
		setIsSeeking(true);
		setLocalPosition(event.target.value);
	}

	return showPlayer ? (
		<>
			<div id="embed-iframe" ref={controlRef}></div>
			<section className="text-white bg-linear-to-br from-pink to-orange w-[90%] h-24 z-100 fixed bottom-20 mx-[5%] rounded-md p-4 grid grid-cols-6">
				<script src="https://open.spotify.com/embed/iframe-api/v1" async></script>
				<Image src={albumCover.url} width={albumCover.width} height={albumCover.height} alt="" className="w-12 h-auto col-span-1" />
				<div className="col-span-5">
					<button onClick={() => controller.togglePlay()}>
						{isPaused ? <FaPlay /> : <FaPause />}
					</button>
					<p>{currentTrack.name}</p>
				</div>
				<input
					type="range"
					value={localPosition}
					max={timing.duration}
					className="col-span-5"
					onChange={changeHandler}
				/>
				<span className="col-span-1 place-self-end">{msToTime(timing.duration - timing.position)}</span>
			</section>
		</>
	) : null;
}