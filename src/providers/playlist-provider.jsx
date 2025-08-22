"use client";

import { createContext, useState } from "react";

export const playlistContext = createContext(null);

export default function PlaylistProvider({ children }) {
	const [playlist, setPlaylist] = useState({});
	const [tracks, setTracks] = useState([]);

	useEffect(function () {
		if (!playlist.id) return
		fetch("/api/playlist-tracks/" + playlist.id)
			.then(response => response.json())
			.then(data => setTracks(data))
	}, [playlist]);

	return (
		<playlistContext.Provider value={{ playlist, setPlaylist, tracks }}>
			{children}
		</playlistContext.Provider>
	);
}