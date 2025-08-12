import { NextResponse } from "next/server";

export default async function middleware(request) {
	const { pathname } = request.nextUrl;

	if (pathname.includes("/login") || pathname.includes("/api")) {
		return;
	}

	if (!request.cookies.has("ipm_access_token")) {
		console.log("middleware: No access token");
		if (!request.cookies.has("ipm_refresh_token")) {
			console.log("middleware: no refresh token. Redirecting to /login");
			return NextResponse.redirect(new URL("/login", request.url));
		}

		console.log("middleware: refresh token exists. Attempting to fetch new access token.")

		const response = await fetch("https://accounts.spotify.com/api/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Basic ${btoa(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET)}`
			},
			body: new URLSearchParams({
				grant_type: "refresh_token",
				refresh_token: request.cookies.get("ipm_refresh_token").value,
				client_id: process.env.CLIENT_ID
			})
		});

		const data = await response.json();

		console.log("middleware: data from spotify:", data);

		const res = NextResponse.next();
		res.cookies.set("ipm_access_token", data.access_token, {
			maxAge: data.expires_in
		});
		return res;
	}

	return;
}

export const config = {
	matcher: ["/", "/album/:path*"]
};