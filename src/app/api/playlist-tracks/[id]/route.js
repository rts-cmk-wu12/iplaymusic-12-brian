"use server";

import { cookies } from "next/headers";

export async function GET(request, { params }) {
	const cookieStore = await cookies();
	const access_token = cookieStore.get("ipm_access_token");
	const { id } = await params;

	const response = await fetch("https://api.spotify.com/v1/playlists/" + id, {
		headers: {
			Authorization: "Bearer " + access_token.value
		}
	});

	const data = await response.json();

	return Response.json(data.tracks.items);
}