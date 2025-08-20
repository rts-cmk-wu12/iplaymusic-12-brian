"use client";

import { createContext, useState } from "react";

export const playerContext = createContext(null);

export default function PlayerProvider({ children }) {
	const [showPlayer, setShowPlayer] = useState(false);
	const [currentTrack, setCurrentTrack] = useState(null);
	const [albumCover, setAlbumCover] = useState(null);

	return (
		<playerContext.Provider value={{ showPlayer, setShowPlayer, currentTrack, setCurrentTrack, albumCover, setAlbumCover }}>
			{children}
		</playerContext.Provider>
	);
}