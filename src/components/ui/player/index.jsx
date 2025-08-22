"use client";

import { playerContext } from "@/providers/player-provider";
import { msToTime } from "@/utils/time";
import Image from "next/image";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
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

function reducer(state, action) {
	switch (action.type) {
		case "setController":
			return {
				...state,
				controller: action.controller
			}
		case "setDuration":
			return {
				...state,
				duration: action.duration
			}
		case "setPosition":
			return {
				...state,
				position: action.position
			}
		case "setLocalPosition":
			return {
				...state,
				localPosition: action.localPosition
			}
		case "setPaused":
			return {
				...state,
				isPaused: action.isPaused
			}
		case "toggleSeeking":
			return {
				...state,
				isSeeking: !action.isSeeking
			}
		case "setDurationAndPosition":
			return {
				...state,
				duration: action.duration,
				position: action.position,
			}
	}

	throw new Error("Unknown action: " + action.type);
}

export default function Player() {
	const { showPlayer, currentTrack, albumCover } = useContext(playerContext);
	const controlRef = useRef();
	const [playerState, dispatch] = useReducer(reducer, {
		controller: null,
		isPaused: false,
		duration: 0,
		position: 0,
		localPosition: 0,
		isSeeking: false,
	});
	const debouncedPosition = useDebounce(playerState.localPosition);

	useEffect(function () {
		if (!playerState.isSeeking) {
			dispatch({ type: "setLocalPosition", localPosition: playerState.position });
		}
	}, [playerState.position, playerState.isSeeking]);

	useEffect(function () {
		if (playerState.isSeeking && debouncedPosition !== playerState.position) {
			new Promise(resolve => {
				playerState.controller.seek(Math.floor(debouncedPosition / 1000));
				resolve();
			}).then(() => dispatch({ type: "toggleSeeking" }));
		}
	}, [debouncedPosition, playerState.position]);

	useEffect(function () {
		window.onSpotifyIframeApiReady = function (IFrameAPI) {
			const options = {
				uri: currentTrack.uri,
				width: 0,
				height: 0,
			};
			const callback = (EmbedController) => {
				EmbedController.play();
				dispatch({ type: "setController", controller: EmbedController });
				EmbedController.addListener("playback_update", function (event) {
					dispatch({ type: "setDurationAndPosition", duration: event.data.duration, position: event.data.position });
					if (event.data.isPaused) dispatch({ type: "setPaused", isPaused: true });
					else dispatch({ type: "setPaused", isPaused: false });
				});
			};
			IFrameAPI.createController(controlRef.current, options, callback);

		};
	}, [currentTrack]);

	function changeHandler(event) {
		dispatch({ type: "toggleSeeking" });
		dispatch({ type: "setLocalPosition", localPosition: event.target.value });
	}

	return showPlayer ? (
		<div>
			<script src="https://open.spotify.com/embed/iframe-api/v1" async></script>
			<div id="embed-iframe" ref={controlRef}></div>
			<section className="text-white bg-linear-to-br from-pink to-orange w-[90%] h-24 z-100 fixed bottom-20 mx-[5%] rounded-md p-4 grid grid-cols-6">
				<Image src={albumCover.url} width={albumCover.width} height={albumCover.height} alt="" className="w-12 h-auto col-span-1" />
				<div className="col-span-5">
					<button onClick={() => playerState.controller.togglePlay()}>
						{playerState.isPaused ? <FaPlay /> : <FaPause />}
					</button>
					<p>{currentTrack.name}</p>
				</div>
				<input
					type="range"
					value={playerState.localPosition}
					max={playerState.duration}
					className="col-span-5"
					onChange={changeHandler}
				/>
				<span className="col-span-1 place-self-end">{msToTime(playerState.duration - playerState.position)}</span>
			</section>
		</div>
	) : null;
}